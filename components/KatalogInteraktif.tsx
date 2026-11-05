"use client";

import { useState } from "react";
import { rupiah, type Event } from "@/events";
import KartuEvent from "@/components/KartuEvents";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [hanyaTersedia, setHanyaTersedia] = useState(false);
  const [jumlahTampil, setJumlahTampil] = useState(4);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  const hasil = events.filter(
    (e) =>
      e.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === "Semua" || e.kategori === kategori) &&
      (!hanyaTersedia || e.terisi < e.kuota),
  );

  const terurut = [...hasil].sort((a, b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);

    return a.tanggal.localeCompare(b.tanggal);
  });

  // Menghitung rata-rata harga
  const totalHarga = hasil.reduce((total, event) => total + event.harga, 0);

  const rataRataHarga = hasil.length > 0 ? totalHarga / hasil.length : 0;

  // Menghitung total sisa tiket
  const totalSisaTiket = hasil.reduce(
    (total, event) => total + (event.kuota - event.terisi),
    0,
  );

  // Membatasi jumlah event yang ditampilkan
  const eventTampil = terurut.slice(0, jumlahTampil);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          value={cari}
          onChange={(e) => {
            setCari(e.target.value);
            setJumlahTampil(4);
          }}
          placeholder="Cari event..."
          className="rounded border bg-white p-3"
        />

        <select
          value={kategori}
          onChange={(e) => {
            setKategori(e.target.value);
            setJumlahTampil(4);
          }}
          className="rounded border bg-white p-3"
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <select
          value={urut}
          onChange={(e) => {
            setUrut(e.target.value);
            setJumlahTampil(4);
          }}
          className="rounded border bg-white p-3"
        >
          <option value="tanggal">Tanggal terdekat</option>
          <option value="murah">Harga termurah</option>
          <option value="mahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hanyaTersedia}
            onChange={(e) => {
              setHanyaTersedia(e.target.checked);
              setJumlahTampil(4);
            }}
          />
          Tiket tersedia saja
        </label>
      </div>

      <p className="mb-3 text-sm text-slate-500">
        {terurut.length} event ditemukan
      </p>

      <p className="text-sm text-slate-500">
        Rata-rata harga: {rupiah(rataRataHarga)}
      </p>

      <p className="mb-3 text-sm text-slate-500">
        Total sisa tiket: {totalSisaTiket}
      </p>

      {terurut.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {eventTampil.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>

          {jumlahTampil < terurut.length && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setJumlahTampil((sebelumnya) => sebelumnya + 4)}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                Tampilkan lagi
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
