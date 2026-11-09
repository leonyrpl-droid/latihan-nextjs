"use client";

import { useActionState } from "react";
import { pesanTiket, type HasilPesan } from "@/app/actions";
import type { Event } from "@/events";

const initialState: HasilPesan = {
  berhasil: false,
  pesan: "",
  galat: {},
  isian: {
    nama: "",
    email: "",
  },
};

export default function FormPesan({ event }: { event: Event }) {
  const [state, formAction, pending] = useActionState(pesanTiket, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="eventId" value={event.id} />

      <div>
        <label className="mb-1 block font-medium">Nama Lengkap</label>
        <input
          type="text"
          name="nama"
          defaultValue={state.isian.nama}
          placeholder="Masukkan nama lengkap"
          className="w-full rounded-lg border p-3"
        />
        {state.galat.nama && (
          <p className="mt-1 text-sm text-red-600">{state.galat.nama}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-medium">Email</label>
        <input
          type="email"
          name="email"
          defaultValue={state.isian.email}
          placeholder="Masukkan email"
          className="w-full rounded-lg border p-3"
        />
        {state.galat.email && (
          <p className="mt-1 text-sm text-red-600">{state.galat.email}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-medium">Jumlah Tiket</label>
        <input
          type="number"
          name="jumlah"
          min="1"
          max="5"
          placeholder="Masukkan jumlah tiket"
          className="w-full rounded-lg border p-3"
        />
        {state.galat.jumlah && (
          <p className="mt-1 text-sm text-red-600">{state.galat.jumlah}</p>
        )}
      </div>

      {state.pesan && (
        <p
          className={
            state.berhasil ? "text-sm text-green-600" : "text-sm text-red-600"
          }
        >
          {state.pesan}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Memproses..." : "Kirim Pesanan"}
      </button>
    </form>
  );
}
