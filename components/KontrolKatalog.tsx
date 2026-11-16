import Form from "next/form";
import type { Saringan } from "@/data/saring";

export default function KontrolKatalog({
  s,
  daftarKategori,
}: {
  s: Saringan;
  daftarKategori: string[];
}) {
  return (
    <Form action="/event" className="mb-4 flex flex-wrap items-center gap-3">
      {/* Pencarian event */}
      <input
        name="cari"
        defaultValue={s.cari}
        placeholder="Cari event..."
        className="rounded border bg-white px-3 py-2"
      />

      {/* Pilihan kategori */}
      <select
        name="kategori"
        defaultValue={s.kategori}
        className="rounded border bg-white px-3 py-2"
      >
        {daftarKategori.map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>

      {/* Pengurutan event */}
      <select
        name="urut"
        defaultValue={s.urut}
        className="rounded border bg-white px-3 py-2"
      >
        <option value="tanggal">Tanggal terdekat</option>
        <option value="murah">Harga termurah</option>
        <option value="mahal">Harga termahal</option>
        <option value="nama">Nama A-Z</option>
      </select>

      {/* Checkbox tiket tersedia */}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="sisa" value="1" defaultChecked={s.sisa} />
        Hanya yang masih ada tiket
      </label>

      {/* Harga maksimal */}
      <input
        type="number"
        name="max"
        min={0}
        defaultValue={s.max ?? ""}
        placeholder="Harga maksimal"
        className="w-40 rounded border bg-white px-3 py-2"
      />

      {/* Tombol terapkan */}
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Terapkan
      </button>
    </Form>
  );
}
