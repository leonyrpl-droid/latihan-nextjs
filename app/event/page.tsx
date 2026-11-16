
import type { Metadata } from "next";
import { ambilEvents } from "@/data/ambil";
import { rupiah } from "@/events";
import {
  PER_HALAMAN,
  bacaSaringan,
  saringEvents,
} from "@/data/saring";
import KontrolKatalog from "@/components/KontrolKatalog";
import KartuEvent from "@/components/KartuEvents";

export const metadata: Metadata = {
  title: "Katalog Event",
};

export default async function Katalog({
  searchParams,
}: PageProps<"/event">) {
  const s = bacaSaringan(await searchParams);
  const events = await ambilEvents();
  const tersusun = saringEvents(events, s);

  const jumlahHalaman = Math.max(
    1,
    Math.ceil(tersusun.length / PER_HALAMAN)
  );

  const hal = Math.min(s.hal, jumlahHalaman);

  const terlihat = tersusun.slice(
    (hal - 1) * PER_HALAMAN,
    hal * PER_HALAMAN
  );

  const daftarKategori = [
    "Semua",
    ...new Set(events.map((e) => e.kategori)),
  ];

  const totalSisa = tersusun.reduce(
    (t, e) => t + (e.kuota - e.terisi),
    0
  );

  const rataharga =
    tersusun.length === 0
      ? 0
      : Math.round(
          tersusun.reduce((t, e) => t + e.harga, 0) /
            tersusun.length
        );

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        Katalog Event
      </h1>

      {/* Formulir mengikuti perubahan URL */}
      <KontrolKatalog
        key={JSON.stringify(s)}
        s={s}
        daftarKategori={daftarKategori}
      />

      <p className="mb-1 text-sm text-slate-500">
        {tersusun.length} event ditemukan
      </p>

      <p className="mb-3 text-sm text-slate-500">
        Rata-rata harga {rupiah(rataharga)} - Total sisa tiket{" "}
        {totalSisa}
      </p>

      {tersusun.length === 0 ? (
        <p className="text-slate-500">
          Tidak ada event yang cocok.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {terlihat.map((e) => (
            <KartuEvent key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}
