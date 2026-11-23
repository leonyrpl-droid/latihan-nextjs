"use client";

import { useActionState } from "react";
import { simpanEvent, type HasilEvent } from "@/app/admin/actions";
import type { Event } from "@/events";

function Galat({ teks }: { teks?: string }) {
  return teks ? <p className="text-sm text-red-600">{teks}</p> : null;
}

export default function FormEvent({ event }: { event?: Event }) {
  const awal: HasilEvent = {
    pesan: "",
    galat: {},
    isian: {
      id: event ? String(event.id) : "",
      judul: event?.judul ?? "",
      kategori: event?.kategori ?? "",
      tanggal: event?.tanggal ?? "",
      lokasi: event?.lokasi ?? "",
      harga: event ? String(event.harga) : "0",
      kuota: event ? String(event.kuota) : "",
      gambar: event?.gambar ?? "",
    },
  };

  const [hasil, kirim, sedangKirim] = useActionState(simpanEvent, awal);
  const i = hasil.isian;
  const kolom = "block w-full rounded border px-3 py-2";

  return (
    <form
      action={kirim}
      className="max-w-lg space-y-3 rounded-xl border bg-white p-6"
    >
      <input type="hidden" name="id" value={i.id} />

      <div>
        <input
          name="judul"
          defaultValue={i.judul}
          placeholder="Judul"
          className={kolom}
        />
        <Galat teks={hasil.galat.judul} />
      </div>

      <div>
        <input
          name="kategori"
          defaultValue={i.kategori}
          placeholder="Kategori"
          className={kolom}
        />
        <Galat teks={hasil.galat.kategori} />
      </div>

      <div>
        <input
          name="tanggal"
          type="date"
          defaultValue={i.tanggal}
          className={kolom}
        />
        <Galat teks={hasil.galat.tanggal} />
      </div>

      <div>
        <input
          name="lokasi"
          defaultValue={i.lokasi}
          placeholder="Lokasi"
          className={kolom}
        />
        <Galat teks={hasil.galat.lokasi} />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <input
            name="harga"
            type="number"
            defaultValue={i.harga}
            placeholder="Harga"
            className={kolom}
          />
          <Galat teks={hasil.galat.harga} />
        </div>

        <div className="flex-1">
          <input
            name="kuota"
            type="number"
            defaultValue={i.kuota}
            placeholder="Kuota"
            className={kolom}
          />
          <Galat teks={hasil.galat.kuota} />
        </div>
      </div>

      <input
        name="gambar"
        defaultValue={i.gambar}
        placeholder="Gambar, misalnya /img/event-1.png (boleh kosong)"
        className={kolom}
      />

      {hasil.pesan && <p className="text-red-600">{hasil.pesan}</p>}

      <button
        disabled={sedangKirim}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {sedangKirim ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}
