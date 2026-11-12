"use client";

import { useActionState, useState } from "react";
import { pesanTiket, type HasilPesan } from "@/app/actions";
import { rupiah, type Event } from "@/events";

export default function FormPesan({
  event,
  namaAwal,
}: {
  event: Event;
  namaAwal: string;
}) {
  const awal: HasilPesan = {
    berhasil: false,
    pesan: "",
    galat: {},
    isian: { nama: namaAwal, email: "" },
  };

  const [hasil, formAction, sedang] = useActionState(pesanTiket, awal);

  const [jumlah, setJumlah] = useState(1);
  const sisa = event.kuota - event.terisi;

  if (sisa === 0) {
    return (
      <p className="mt-4 font-semibold text-red-600">Tiket sudah habis.</p>
    );
  }

  return (
    <form action={formAction} className="mt-6 space-y-3 border-t pt-6">
      <h2 className="text-xl font-bold">Formulir Pemesanan</h2>

      <input type="hidden" name="eventId" value={event.id} />

      <div>
        <input
          name="nama"
          defaultValue={hasil.isian.nama || namaAwal}
          placeholder="Nama lengkap"
          className="block w-full rounded border p-3"
        />
        {hasil.galat.nama && (
          <p className="text-sm text-red-600">{hasil.galat.nama}</p>
        )}
      </div>

      <div>
        <input
          name="email"
          type="email"
          defaultValue={hasil.isian.email}
          placeholder="Email"
          className="block w-full rounded border p-3"
        />
        {hasil.galat.email && (
          <p className="text-sm text-red-600">{hasil.galat.email}</p>
        )}
      </div>

      <div>
        <input
          name="jumlah"
          type="number"
          min="1"
          max="5"
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
          className="block w-32 rounded border p-3"
        />
        {hasil.galat.jumlah && (
          <p className="text-sm text-red-600">{hasil.galat.jumlah}</p>
        )}
      </div>

      <p>
        Total: <b>{rupiah(event.harga * jumlah)}</b>
      </p>

      {hasil.pesan && (
        <p className={hasil.berhasil ? "text-green-700" : "text-red-600"}>
          {hasil.pesan}
        </p>
      )}

      <button
        disabled={sedang}
        className="rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {sedang ? "Memproses..." : "Pesan"}
      </button>
    </form>
  );
}
