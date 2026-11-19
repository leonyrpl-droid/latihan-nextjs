import Link from "next/link";
import { ambilEvents } from "@/data/ambil";
import KartuEvent from "@/components/KartuEvents";

export default async function Beranda() {
  const semua = await ambilEvents();
  const terdekat = [...semua]
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal))
    .slice(0, 3);

  return (
    <div>
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold">
          Temukan event seru di sekolahmu
        </h1>

        <p className="mt-3 text-slate-600">
          Workshop, lomba, musik, dan bazar. Pesan tiketnya di sini.
        </p>

        <Link
          href="/event"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          Lihat semua event
        </Link>
      </section>

      <h2 className="mb-3 text-xl font-semibold">
        Event terdekat
      </h2>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {terdekat.map((e) => (
          <KartuEvent key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}