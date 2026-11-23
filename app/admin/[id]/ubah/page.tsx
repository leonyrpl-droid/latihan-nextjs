import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ambilEvent } from "@/data/ambil";
import FormEvent from "@/components/FormEvent";

export const metadata: Metadata = { title: "Ubah Event" };

export default async function Ubah({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await ambilEvent(Number(id));

  if (!event) notFound();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Ubah Event</h1>
      <FormEvent event={event} />
    </div>
  );
}
