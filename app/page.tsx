
import Link from "next/link";
import { events } from "@/events";
import KartuEvent from "@/components/KartuEvents";

export default function Beranda() {
  const terdekat = [...events]
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal))
    .slice(0, 3);

  return (
    <main>
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold">
          Temukan Event Seru di Sekolahmu
        </h1>

        <p className="mt-3 text-slate-600">
          Workshop, lomba, musik, dan bazar. Pesan tiketnya di sini.
        </p>

        <Link
          href="/event"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
        >
          Lihat Semua Event
        </Link>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">
          Event Terdekat
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {terdekat.map((e) => (
            <KartuEvent key={e.id} event={e} />
          ))}
        </div>
      </section>
    </main>
  );
}
