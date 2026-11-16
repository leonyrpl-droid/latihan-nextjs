export type Event = {
  id: number;
  judul: string;
  kategori: string;
  tanggal: string;
  lokasi: string;
  harga: number;
  kuota: number;
  terisi: number;
  gambar?: string;
};

export const events: Event[] = [
  {
    id: 1,
    judul: "Workshop React untuk Pemula",
    kategori: "Workshop",
    tanggal: "2026-11-14",
    lokasi: "Lab RPL",
    harga: 50000,
    kuota: 30,
    terisi: 12,
    gambar: "/img/event-1.png",
  },
  {
    id: 2,
    judul: "Turnamen Futsal Antar Kelas",
    kategori: "Olahraga",
    tanggal: "2026-11-20",
    lokasi: "Lapangan Sekolah",
    harga: 0,
    kuota: 20,
    terisi: 20,
    gambar: "/img/event-2.png",
  },
  {
    id: 3,
    judul: "Konser Musik Akustik",
    kategori: "Musik",
    tanggal: "2026-11-27",
    lokasi: "Aula",
    harga: 25000,
    kuota: 150,
    terisi: 96,
    gambar: "/img/event-3.png",
  },
  {
    id: 4,
    judul: "Bazar Karya Siswa",
    kategori: "Bazar",
    tanggal: "2026-12-03",
    lokasi: "Halaman Depan",
    harga: 0,
    kuota: 300,
    terisi: 41,
    gambar: "/img/event-4.png",
  },
  {
    id: 5,
    judul: "Pelatihan Desain Poster",
    kategori: "Workshop",
    tanggal: "2026-12-05",
    lokasi: "Lab Multimedia",
    harga: 35000,
    kuota: 25,
    terisi: 25,
    gambar: "/img/event-5.png",
  },
  {
    id: 6,
    judul: "Lomba Cerdas Cermat",
    kategori: "Lomba",
    tanggal: "2026-12-10",
    lokasi: "Aula",
    harga: 10000,
    kuota: 60,
    terisi: 18,
    gambar: "/img/event-6.png",
  },
];

export function rupiah(n: number) {
  return n === 0 ? "Gratis" : "Rp " + n.toLocaleString("id-ID");
}
