import Form from "next/form";
import type { Dispatch, SetStateAction } from "react";
import type { Saringan } from "@/data/saring";

type PropsServer = {
  s: Saringan;
  daftarKategori: string[];
};

type PropsClient = {
  cari: string;
  setCari: Dispatch<SetStateAction<string>>;
  kategori: string;
  daftarKategori: string[];
  setKategori: Dispatch<SetStateAction<string>>;
  urut: string;
  setUrut: Dispatch<SetStateAction<string>>;
  hanyaTersedia: boolean;
  setHanyaTersedia: Dispatch<SetStateAction<boolean>>;
  hargaMaksimal: string;
  setHargaMaksimal: Dispatch<SetStateAction<string>>;
  setJumlahTampil: Dispatch<SetStateAction<number>>;
};

export default function KontrolKatalog(props: PropsServer | PropsClient) {
  const isServer = "s" in props;

  if (isServer) {
    const { s, daftarKategori } = props;

    return (
      <Form action="/event" className="mb-4 flex flex-wrap items-center gap-3">
        <input
          name="cari"
          defaultValue={s.cari}
          placeholder="Cari event..."
          className="rounded border bg-white px-3 py-2"
        />

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

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="sisa" value="1" defaultChecked={s.sisa} />
          Hanya yang masih ada tiket
        </label>

        <input
          type="number"
          name="max"
          min={0}
          defaultValue={s.max ?? ""}
          placeholder="Harga maksimal"
          className="w-40 rounded border bg-white px-3 py-2"
        />

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Terapkan
        </button>
      </Form>
    );
  }

  const {
    cari,
    setCari,
    kategori,
    daftarKategori,
    setKategori,
    urut,
    setUrut,
    hanyaTersedia,
    setHanyaTersedia,
    hargaMaksimal,
    setHargaMaksimal,
    setJumlahTampil,
  } = props;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <input
        value={cari}
        onChange={(e) => {
          setCari(e.target.value);
          setJumlahTampil(4);
        }}
        placeholder="Cari event..."
        className="rounded border bg-white px-3 py-2"
      />

      <select
        value={kategori}
        onChange={(e) => {
          setKategori(e.target.value);
          setJumlahTampil(4);
        }}
        className="rounded border bg-white px-3 py-2"
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
        className="rounded border bg-white px-3 py-2"
      >
        <option value="tanggal">Tanggal terdekat</option>
        <option value="murah">Harga termurah</option>
        <option value="mahal">Harga termahal</option>
        <option value="nama">Nama A-Z</option>
      </select>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={hanyaTersedia}
          onChange={(e) => {
            setHanyaTersedia(e.target.checked);
            setJumlahTampil(4);
          }}
        />
        Hanya yang masih ada tiket
      </label>

      <input
        type="number"
        min={0}
        value={hargaMaksimal}
        onChange={(e) => {
          setHargaMaksimal(e.target.value);
          setJumlahTampil(4);
        }}
        placeholder="Harga maksimal"
        className="w-40 rounded border bg-white px-3 py-2"
      />
    </div>
  );
}
