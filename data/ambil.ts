
import { events, type Event } from "@/events";
import { supabase } from "@/lib/supabase";

// Pura-pura mengambil data dari database yang agak lambat.
function jeda(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mengambil semua event dari Supabase bila konfigurasi tersedia.
// Jika environment variable belum di-set, fallback ke data lokal.
export async function ambilEvents(): Promise<Event[]> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return events;
  }

  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("tanggal");

    if (error) {
      throw new Error("Gagal memuat event: " + error.message);
    }

    return (data ?? []) as Event[];
  } catch {
    return events;
  }
}

// Mengambil satu event berdasarkan ID.
// Untuk sementara masih menggunakan data lokal.
export async function ambilEvent(id: number) {
  await jeda(800);
  return events.find((e) => e.id === id);
}

// Mengambil event terkait.
// Untuk sementara masih menggunakan data lokal.
export async function ambilTerkait(event: Event) {
  await jeda(2000);

  return events.filter(
    (e) => e.kategori === event.kategori && e.id !== event.id,
  );
}
