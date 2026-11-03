
"use client";

import { useState } from "react";
import { rupiah, type Event } from "@/events";
import type { FormEvent } from "react";

export default function FormPesan({ event }: { event: Event }) {
  const sisa = event.kuota - event.terisi;
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [pesan, setPesan] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  function kirim(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBerhasil(false);

    if (nama.trim().length < 3) {
      return setPesan("Nama minimal 3 huruf.");
    }
    if (jumlah < 1) {
      return setPesan("Jumlah tiket minimal 1.");
    }
    if (!Number.isInteger(jumlah)) {
      return setPesan("Jumlah tiket harus berupa angka bulat.");
    }
    if (jumlah > sisa) {
      return setPesan("Sisa tiket hanya tersedia " + sisa + ".");
    }

    setPesan("");
    setBerhasil(true);
  }

  if (sisa === 0) {
    return <p className="mt-6 font-medium text-red-600">Tiket sudah habis.</p>;
  }

  return (
    <form onSubmit={kirim} className="mt-6 space-y-3 border-t pt-4">
      <h2 className="text-lg font-semibold">Pesan Tiket</h2>

      <input
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Nama pemesan"
        className="w-full rounded border px-3 py-2"
      />

      <input
        type="number"
        min="1"
        max={sisa}
        step="1"
        value={jumlah}
        onChange={(e) => setJumlah(Number(e.target.value))}
        className="block w-32 rounded border px-3 py-2"
      />

      <p>
        Total: <b>{rupiah(event.harga * jumlah)}</b>
      </p>

      {pesan && (
        <p className="text-sm text-red-600">{pesan}</p>
      )}

      {berhasil && (
        <p className="text-green-700">
          Terima kasih {nama}! Jumlah {jumlah} tiket dipesan (belum tersimpan, ini masih latihan).
        </p>
      )}

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Pesan
      </button>
    </form>
  );
}
