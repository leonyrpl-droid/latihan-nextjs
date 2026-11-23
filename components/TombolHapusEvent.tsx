"use client";

import { type FormEvent } from "react";
import { hapusEvent } from "@/app/admin/actions";

type Props = {
  id: number;
};

export default function TombolHapusEvent({ id }: Props) {
  function konfirmasiHapus(event: FormEvent<HTMLFormElement>) {
    const yakin = window.confirm(
      "Apakah kamu yakin ingin menghapus event ini?",
    );

    if (!yakin) {
      event.preventDefault();
    }
  }

  return (
    <form action={hapusEvent} onSubmit={konfirmasiHapus}>
      <input type="hidden" name="id" value={id} />

      <button type="submit" className="text-red-600 underline">
        Hapus
      </button>
    </form>
  );
}
