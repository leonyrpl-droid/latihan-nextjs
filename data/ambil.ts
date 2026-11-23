import { cache } from "react";

import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Event } from "@/events";

// Mengambil semua event dari database
export async function ambilEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("tanggal");

  if (error) {
    throw new Error("Gagal memuat event: " + error.message);
  }

  return data as Event[];
}

// Mengambil satu event dan mencegah query berulang
export const ambilEvent = cache(async (id: number): Promise<Event | null> => {
  if (!Number.isInteger(id)) return null;

  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Gagal memuat event: " + error.message);
  }

  return data as Event | null;
});

// Mengambil event terkait berdasarkan kategori
export async function ambilTerkait(event: Event): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("kategori", event.kategori)
    .neq("id", event.id)
    .order("tanggal");

  if (error) {
    throw new Error("Gagal memuat event terkait: " + error.message);
  }

  return data as Event[];
}

// Menghitung jumlah pesanan
export async function hitungPesanan(eventId: number): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("pesanan")
    .select("*", { count: "exact", head: true })
    .eq("event_id", eventId);

  if (error) {
    throw new Error("Gagal menghitung pesanan: " + error.message);
  }

  return count ?? 0;
}

// Menghitung total tiket yang dipesan
export async function hitungTiketPesanan(eventId: number): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("jumlah")
    .eq("event_id", eventId);

  if (error) {
    throw new Error("Gagal menghitung tiket pesanan: " + error.message);
  }

  return (data ?? []).reduce(
    (total, pesanan) => total + Number(pesanan.jumlah ?? 0),
    0,
  );
}
