"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ambilEvent } from "@/data/ambil";
import { supabaseAdmin } from "@/lib/supabase-admin";

export type HasilPesan = {
  berhasil: boolean;
  pesan: string;
  galat: { nama?: string; email?: string; jumlah?: string };
  isian: { nama: string; email: string };
};

export async function pesanTiket(
  _sebelum: HasilPesan,
  formData: FormData,
): Promise<HasilPesan> {
  const eventId = Number(formData.get("eventId"));
  const nama = String(formData.get("nama") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const jumlah = Number(formData.get("jumlah"));
  const isian = { nama, email };

  // Membaca event langsung dari database.
  const event = await ambilEvent(eventId);

  if (!event) {
    return {
      berhasil: false,
      pesan: "Event tidak ditemukan.",
      galat: {},
      isian,
    };
  }

  const sisa = event.kuota - event.terisi;
  const galat: HasilPesan["galat"] = {};

  if (nama.length < 3) {
    galat.nama = "Nama minimal 3 huruf.";
  } else if (nama.length > 40) {
    galat.nama = "Nama maksimal 40 huruf.";
  }

  if (!email.includes("@")) {
    galat.email = "Email harus memuat tanda @.";
  }

  if (!Number.isInteger(jumlah) || jumlah < 1) {
    galat.jumlah = "Jumlah tiket minimal 1.";
  } else if (jumlah > 5) {
    galat.jumlah = "Maksimal 5 tiket per pesanan.";
  } else if (jumlah > sisa) {
    galat.jumlah = `Sisa tiket hanya ${sisa}.`;
  }

  if (Object.keys(galat).length > 0) {
    return {
      berhasil: false,
      pesan: "Periksa lagi isian yang merah.",
      galat,
      isian,
    };
  }

  // Menyimpan pesanan ke database.
  const { data: baru, error } = await supabaseAdmin
    .from("pesanan")
    .insert({
      event_id: eventId,
      nama,
      email,
      jumlah,
      total: event.harga * jumlah,
    })
    .select("nomor")
    .single();

  if (error) {
    return {
      berhasil: false,
      pesan: "Pesanan gagal disimpan. Coba lagi.",
      galat: {},
      isian,
    };
  }

  // Memperbarui jumlah tiket yang terisi.
  const { error: galatKuota } = await supabaseAdmin
    .from("events")
    .update({ terisi: event.terisi + jumlah })
    .eq("id", eventId);

  if (galatKuota) {
    return {
      berhasil: false,
      pesan:
        "Pesanan tersimpan, tetapi kuota gagal diperbarui. Hubungi panitia.",
      galat: {},
      isian,
    };
  }

  const toples = await cookies();

  toples.set("nama", nama, {
    maxAge: 60 * 60 * 24 * 30,
  });

  revalidatePath("/event");
  revalidatePath(`/event/${eventId}`);
  revalidatePath("/pesanan");

  return {
    berhasil: true,
    pesan: `Pesanan #${baru.nomor} tersimpan: ${jumlah} tiket untuk ${nama}.`,
    galat: {},
    isian: { nama: "", email: "" },
  };
}

export async function batalkanPesanan(formData: FormData) {
  const nomor = Number(formData.get("nomor"));
  const namaSaya = (await cookies()).get("nama")?.value;

  if (!Number.isInteger(nomor) || !namaSaya) return;

  // Menghapus hanya pesanan milik pengguna sendiri.
  const { data: batal } = await supabaseAdmin
    .from("pesanan")
    .delete()
    .eq("nomor", nomor)
    .eq("nama", namaSaya)
    .select()
    .maybeSingle();

  if (!batal) return;

  // Mengembalikan kuota tiket.
  const event = await ambilEvent(batal.event_id);

  if (event) {
    await supabaseAdmin
      .from("events")
      .update({
        terisi: Math.max(0, event.terisi - batal.jumlah),
      })
      .eq("id", batal.event_id);
  }

  revalidatePath("/event");
  revalidatePath(`/event/${batal.event_id}`);
  revalidatePath("/pesanan");
}
