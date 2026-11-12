"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { events } from "@/events";
import { pesanan, tambahPesanan } from "@/data/pesanan";

export type HasilPesan = {
  berhasil: boolean;
  pesan: string;
  galat: {
    nama?: string;
    email?: string;
    jumlah?: string;
  };
  isian: {
    nama: string;
    email: string;
  };
};

export async function pesanTiket(
  _state: HasilPesan,
  formData: FormData,
): Promise<HasilPesan> {
  const eventId = Number(formData.get("eventId"));
  const nama = String(formData.get("nama") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const jumlah = Number(formData.get("jumlah"));
  const isian = { nama, email };

  // Pura-pura server sedang sibuk
  await new Promise((r) => setTimeout(r, 800));

  const event = events.find((e) => e.id === eventId);

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

  // Menyimpan nama pelanggan ke Cookie selama 30 hari
  const token = await cookies();

  token.set("nama", nama, {
    maxAge: 60 * 60 * 24 * 30,
  });

  event.terisi += jumlah;

  const nomor = tambahPesanan({
    eventId,
    judul: event.judul,
    nama,
    email,
    jumlah,
    total: event.harga * jumlah,
    waktu: new Date().toISOString(),
  });

  revalidatePath("/event");
  revalidatePath(`/event/${eventId}`);
  revalidatePath("/pesanan");

  return {
    berhasil: true,
    pesan: `Pesanan #${nomor} tersimpan: ${jumlah} tiket untuk ${nama}.`,
    galat: {},
    isian: { nama, email: "" },
  };
}

// Fungsi untuk membatalkan pesanan
export async function batalkanPesanan(formData: FormData) {
  const nomor = Number(formData.get("nomor"));
  const namaSaya = (await cookies()).get("nama")?.value;

  const i = pesanan.findIndex((p) => p.nomor === nomor);

  // Memastikan pesanan milik pelanggan yang sedang login
  if (i === -1 || !namaSaya || pesanan[i].nama !== namaSaya) {
    return;
  }

  // Menghapus pesanan
  const [batal] = pesanan.splice(i, 1);

  // Mengembalikan kuota tiket
  const event = events.find((e) => e.id === batal.eventId);

  if (event) {
    event.terisi -= batal.jumlah;
  }

  // Memperbarui halaman
  revalidatePath("/event");
  revalidatePath(`/event/${batal.eventId}`);
  revalidatePath("/pesanan");
}
