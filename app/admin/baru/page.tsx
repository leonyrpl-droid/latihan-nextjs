import type { Metadata } from "next";
import FormEvent from "@/components/FormEvent";

export const metadata: Metadata = { title: "Tambah Event" };

export default function Baru() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Tambah Event</h1>
      <FormEvent />
    </div>
  );
}
