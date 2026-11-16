import type { Event } from "@/events";

export const PER_HALAMAN = 4;

export type Saringan = {
  cari: string;
  kategori: string;
  urut: string;
  sisa: boolean;
  max: number | null;
  hal: number;
};

type IsiURL = { [kunci: string]: string | string[] | undefined };

export function bacaSaringan(isi: IsiURL): Saringan {
  const teks = (kunci: string) => {
    const nilai = isi[kunci];
    return typeof nilai === "string" ? nilai : "";
  };

  const max = Number(teks("max"));
  const hal = Number(teks("hal"));

  return {
    cari: teks("cari"),
    kategori: teks("kategori") || "Semua",
    urut: teks("urut") || "tanggal",
    sisa: teks("sisa") === "1",
    max: teks("max") !== "" && max >= 0 ? max : null,
    hal: Number.isInteger(hal) && hal >= 1 ? hal : 1,
  };
}

export function saringEvents(events: Event[], s: Saringan) {
  const hasil = events.filter(
    (e) =>
      e.judul.toLowerCase().includes(s.cari.toLowerCase()) &&
      (s.kategori === "Semua" || e.kategori === s.kategori) &&
      (!s.sisa || e.kuota - e.terisi > 0) &&
      (s.max === null || e.harga <= s.max),
  );

  return [...hasil].sort((a, b) => {
    if (s.urut === "murah") return a.harga - b.harga;
    if (s.urut === "mahal") return b.harga - a.harga;
    if (s.urut === "nama") return a.judul.localeCompare(b.judul);
    return a.tanggal.localeCompare(b.tanggal);
  });
}

export function alamatHalaman(s: Saringan, hal: number) {
  const q = new URLSearchParams();

  if (s.cari) q.set("cari", s.cari);
  if (s.kategori !== "Semua") q.set("kategori", s.kategori);
  if (s.urut !== "tanggal") q.set("urut", s.urut);
  if (s.sisa) q.set("sisa", "1");
  if (s.max !== null) q.set("max", String(s.max));
  if (hal > 1) q.set("hal", String(hal));

  const teks = q.toString();

  return teks ? `/event?${teks}` : "/event";
}
