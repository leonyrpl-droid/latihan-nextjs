
import Link from "next/link";
import TombolFavorit from "@/components/TombolFavorit";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { events, rupiah } from "@/events";
import FormPesan from "@/components/FormPesan";

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    notFound();
  }

  // Mengambil nama pelanggan dari Cookie
  const namaAwal = (await cookies()).get("nama")?.value ?? "";

  // Mencari event dengan kategori yang sama,
  // tetapi tidak menampilkan event yang sedang dibuka.
  const eventTerkait = events.filter(
    (e) => e.kategori === event.kategori && e.id !== event.id,
  );

  const sisa = event.kuota - event.terisi;

  return (
    <article className="rounded-xl border bg-white p-6">
      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {event.kategori}
      </span>

      <h1 className="mt-2 text-3xl font-bold">{event.judul}</h1>

      <TombolFavorit id={event.id} />

      <p className="mt-1 text-slate-500">
        {event.tanggal} · {event.lokasi}
      </p>

      <p className="mt-4 text-xl font-semibold">
        {rupiah(event.harga)}
      </p>

      <p className="text-slate-600">
        Sisa {sisa} dari {event.kuota} tiket
      </p>

      <FormPesan event={event} namaAwal={namaAwal} />

      {/* Bagian Event Terkait */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold">Event Terkait</h2>

        {eventTerkait.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {eventTerkait.map((e) => (
              <Link
                key={e.id}
                href={`/event/${e.id}`}
                className="rounded-xl border p-4 transition hover:border-blue-500 hover:bg-blue-50"
              >
                <h3 className="font-semibold">{e.judul}</h3>

                <p className="mt-1 text-sm text-slate-500">
                  {e.kategori}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">
            Belum ada event terkait.
          </p>
        )}
      </section>
    </article>
  );
}
