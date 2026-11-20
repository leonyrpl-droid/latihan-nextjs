import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Event } from "@/events";
import type { Pesanan } from "@/data/pesanan";

export async function ambilEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("tanggal");

  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event[];
}

export async function ambilEvent(id: number): Promise<Event | null> {
  // Periksa ID sebelum mengambil data dari database.
  if (!Number.isInteger(id)) return null;

  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event | null;
}

export async function ambilTerkait(event: Event): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("kategori", event.kategori)
    .neq("id", event.id)
    .order("tanggal");

  if (error) throw new Error("Gagal memuat event terkait: " + error.message);
  return data as Event[];
}

// Menghitung jumlah pesanan untuk satu event.
export async function hitungPesanan(eventId: number): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("pesanan")
    .select("*", { count: "exact", head: true })
    .eq("event_id", eventId);

  if (error) throw new Error("Gagal menghitung pesanan: " + error.message);
  return count ?? 0;
}

// Menghitung total tiket yang dipesan untuk satu event.
export async function hitungTiketPesanan(eventId: number): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("jumlah")
    .eq("event_id", eventId);

  if (error) throw new Error("Gagal menghitung tiket: " + error.message);

  return (data ?? []).reduce(
    (total, pesanan) => total + Number(pesanan.jumlah),
    0,
  );
}

// Mengambil semua pesanan beserta judul event.
export async function ambilPesanan(): Promise<Pesanan[]> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("*, events(judul)")
    .order("nomor", { ascending: false });

  if (error) throw new Error("Gagal memuat pesanan: " + error.message);

  return data as Pesanan[];
}
