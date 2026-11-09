"use client";

import { useActionState } from "react";
import { kirimPesan, type FormState } from "@/app/actions";
import type { Event } from "@/events";

const initialState: FormState = {
  success: false,
  message: "",
  errors: {},
};

export default function FormPesan({ event }: { event: Event }) {
  const [state, formAction, pending] = useActionState(kirimPesan, initialState);

  const sisaKuota = event.kuota - event.terisi;

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="sisaKuota" value={sisaKuota} />

      <div>
        <label className="mb-1 block font-medium">Nama Lengkap</label>
        <input
          type="text"
          name="nama"
          placeholder="Masukkan nama lengkap"
          className="w-full rounded-lg border p-3"
        />
        {state.errors.nama && (
          <p className="mt-1 text-sm text-red-600">{state.errors.nama}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-medium">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Masukkan email"
          className="w-full rounded-lg border p-3"
        />
        {state.errors.email && (
          <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-medium">Jumlah Tiket</label>
        <input
          type="number"
          name="jumlah"
          min="1"
          placeholder="Masukkan jumlah tiket"
          className="w-full rounded-lg border p-3"
        />
        {state.errors.jumlah && (
          <p className="mt-1 text-sm text-red-600">{state.errors.jumlah}</p>
        )}
      </div>

      {state.message && (
        <p className={state.success ? "text-green-600" : "text-red-600"}>
          {state.message}
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
