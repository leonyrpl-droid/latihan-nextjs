import Link from "next/link";
import { cookies } from "next/headers";
import { pesanan } from "@/data/pesanan";
import { rupiah } from "@/events";
import { batalkanPesanan } from "@/app/actions";

export default async function HalamanPesanan() {
  const nama = (await cookies()).get("nama")?.value;

  const totalTiket = pesanan.reduce((t, p) => t + p.jumlah, 0);
  const pendapatan = pesanan.reduce((t, p) => t + p.total, 0);

  return (
    <div>
      {nama && <h1 className="mb-2 text-2xl font-bold">Halo, {nama}!</h1>}

      <h2 className="mb-2 text-xl font-bold">Daftar Pesanan</h2>

      {pesanan.length === 0 ? (
        <p className="text-slate-500">
          Belum ada pesanan.{" "}
          <Link href="/event" className="text-blue-600 underline">
            Pilih event
          </Link>
        </p>
      ) : (
        <>
          <p className="mb-3 text-sm text-slate-500">
            {pesanan.length} pesanan - {totalTiket} tiket - pendapatan{" "}
            {rupiah(pendapatan)}
          </p>

          <table className="w-full rounded-xl border bg-white text-sm">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Event</th>
                <th className="p-2">Pemesan</th>
                <th className="p-2">Tiket</th>
                <th className="p-2">Total</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {pesanan.map((p) => (
                <tr key={p.nomor} className="border-t">
                  <td className="p-2">{p.nomor}</td>
                  <td className="p-2">{p.judul}</td>

                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      {p.nama}

                      {nama && p.nama === nama && (
                        <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                          Kamu
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-2">{p.jumlah}</td>
                  <td className="p-2">{rupiah(p.total)}</td>

                  <td className="p-2">
                    {nama && p.nama === nama && (
                      <form action={batalkanPesanan}>
                        <input type="hidden" name="nomor" value={p.nomor} />

                        <button className="text-red-600 underline">
                          Batalkan
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
