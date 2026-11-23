import Link from "next/link";
import { ambilEvents } from "@/data/ambil";
import { rupiah } from "@/events";
import TombolHapusEvent from "@/components/TombolHapusEvent";

export default async function Admin({ searchParams }: PageProps<"/admin">) {
  const { info, galat, q } = await searchParams;

  const kataKunci = typeof q === "string" ? q.trim() : "";

  const semuaEvent = await ambilEvents();

  const events = semuaEvent.filter((event) =>
    event.judul.toLowerCase().includes(kataKunci.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Event</h1>

        <Link
          href="/admin/baru"
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          Tambah event
        </Link>
      </div>

      {typeof info === "string" && (
        <p className="mb-3 rounded bg-green-100 px-3 py-2 text-green-800">
          {info}
        </p>
      )}

      {typeof galat === "string" && (
        <p className="mb-3 rounded bg-red-100 px-3 py-2 text-red-800">
          {galat}
        </p>
      )}

      {/* Form pencarian */}
      <form action="/admin" method="GET" className="mb-4 flex gap-2">
        <input
          type="search"
          name="q"
          placeholder="Cari judul event..."
          defaultValue={kataKunci}
          className="w-full rounded-lg border px-4 py-2"
        />

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Cari
        </button>
      </form>

      <table className="w-full rounded-xl border bg-white text-sm">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-2">Event</th>
            <th className="p-2">Tanggal</th>
            <th className="p-2">Harga</th>
            <th className="p-2">Terisi</th>
            <th className="p-2"></th>
          </tr>
        </thead>

        <tbody>
          {events.length > 0 ? (
            events.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="p-2">{e.judul}</td>
                <td className="p-2">{e.tanggal}</td>
                <td className="p-2">{rupiah(e.harga)}</td>
                <td className="p-2">
                  {e.terisi}/{e.kuota}
                </td>
                <td className="flex gap-3 p-2">
                  <Link
                    href={`/admin/${e.id}/ubah`}
                    className="text-blue-600 underline"
                  >
                    Ubah
                  </Link>

                  <TombolHapusEvent id={e.id} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center text-slate-500">
                Event tidak ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
