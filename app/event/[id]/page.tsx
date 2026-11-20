import { Suspense } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { rupiah } from "@/events";
import { ambilEvent, hitungPesanan, hitungTiketPesanan } from "@/data/ambil";
import FormPesan from "@/components/FormPesan";
import TombolFavorit from "@/components/TombolFavorit";
import EventTerkait from "@/components/EventTerkait";

export async function generateMetadata({
  params,
}: PageProps<"/event/[id]">): Promise<Metadata> {
  const { id } = await params;
  const event = await ambilEvent(Number(id));

  if (!event) return { title: "Event tidak ditemukan" };

  return {
    title: event.judul,
    description: `${event.kategori} di ${event.lokasi}, ${event.tanggal}. ${rupiah(event.harga)}.`,
  };
}

export default async function Detail({ params }: PageProps<"/event/[id]">) {
  const { id } = await params;
  const event = await ambilEvent(Number(id));
  if (!event) notFound();

  const jumlahPesanan = await hitungPesanan(event.id);
  const jumlahTiket = await hitungTiketPesanan(event.id);
  const sisa = event.kuota - event.terisi;
  const namaAwal = (await cookies()).get("nama")?.value ?? "";

  return (
    <article className="rounded-xl border bg-white p-6">
      <div className="relative mb-4 aspect-[40/21] w-full">
        <Image
          src={event.gambar ?? "/img/default.png"}
          alt={event.judul}
          fill
          sizes="(max-width: 1024px) 100vw, 960px"
          preload
          className="rounded-lg object-cover"
        />
      </div>

      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {event.kategori}
      </span>

      <h1 className="mt-2 text-3xl font-bold">{event.judul}</h1>

      <p className="mt-1 text-slate-500">
        {event.tanggal} · {event.lokasi}
      </p>

      <p className="mt-4 text-xl font-semibold">{rupiah(event.harga)}</p>

      <p className="text-slate-600">
        Sisa {sisa} dari {event.kuota} tiket
      </p>

      <p className="text-sm text-slate-500">
        {jumlahPesanan} pesanan masuk lewat EventKu
      </p>

      <p className="text-sm text-slate-500">
        {jumlahTiket} tiket dipesan lewat EventKu
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
