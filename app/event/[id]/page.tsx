import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { rupiah } from "@/events";
import { ambilEvent } from "@/data/ambil";
import FormPesan from "@/components/FormPesan";
import TombolFavorit from "@/components/TombolFavorit";
import EventTerkait from "@/components/EventTerkait";

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await ambilEvent(Number(id));

  if (!event) {
    notFound();
  }

  const sisa = event.kuota - event.terisi;
  const namaAwal = (await cookies()).get("nama")?.value ?? "";

  return (
    <article className="rounded-xl border bg-white p-6">
      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {event.kategori}
      </span>

      <h1 className="mt-2 text-3xl font-bold">{event.judul}</h1>

      <p className="mt-1 text-slate-500">
        {event.tanggal} · {event.lokasi}
      </p>

      <p className="mt-4 text-xl font-semibold">{rupiah(event.harga)}</p>

      <p className="mt-1 text-slate-600">
        Sisa {sisa} dari {event.kuota} tiket
      </p>

      <TombolFavorit id={event.id} />

      <FormPesan event={event} namaAwal={namaAwal} />

      <section className="mt-6">
        <h2 className="font-semibold">Event terkait</h2>

        <Suspense
          fallback={<p className="text-slate-400">Memuat event terkait...</p>}
        >
          <EventTerkait event={event} />
        </Suspense>
      </section>
    </article>
  );
}
