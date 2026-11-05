"use client";

import { useState } from "react";
import { rupiah, type Event } from "@/events";
import KartuEvent from "@/components/KartuEvents";
import KontrolKatalog from "@/components/KontrolKatalog";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [hanyaTersedia, setHanyaTersedia] = useState(false);
  const [hargaMaksimal, setHargaMaksimal] = useState("");
  const [jumlahTampil, setJumlahTampil] = useState(4);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  // Penyaringan event
  const hasil = events.filter(
    (e) =>
      e.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === "Semua" || e.kategori === kategori) &&
      (!hanyaTersedia || e.terisi < e.kuota) &&
      (hargaMaksimal === "" || e.harga <= Number(hargaMaksimal)),
  );

  // Pengurutan event
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
      {/* Komponen kontrol pencarian dan penyaringan */}
      <KontrolKatalog
        cari={cari}
        setCari={setCari}
        kategori={kategori}
        daftarKategori={daftarKategori}
        setKategori={setKategori}
        urut={urut}
        setUrut={setUrut}
        hanyaTersedia={hanyaTersedia}
        setHanyaTersedia={setHanyaTersedia}
        hargaMaksimal={hargaMaksimal}
        setHargaMaksimal={setHargaMaksimal}
        setJumlahTampil={setJumlahTampil}
      />

      {/* Statistik event */}
      <p className="mb-3 text-sm text-slate-500">
        {terurut.length} event ditemukan
      </p>

      <p className="text-sm text-slate-500">
        Rata-rata harga: {rupiah(rataRataHarga)}
      </p>

      <p className="mb-3 text-sm text-slate-500">
        Total sisa tiket: {totalSisaTiket}
      </p>

      {/* Daftar event */}
      {terurut.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {eventTampil.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>

          {/* Tombol tampilkan lagi */}
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
