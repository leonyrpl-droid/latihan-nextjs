type Props = {
  cari: string;
  setCari: (nilai: string) => void;
  kategori: string;
  daftarKategori: string[];
  setKategori: (nilai: string) => void;
  urut: string;
  setUrut: (nilai: string) => void;
  hanyaTersedia: boolean;
  setHanyaTersedia: (nilai: boolean) => void;
  hargaMaksimal: string;
  setHargaMaksimal: (nilai: string) => void;
  setJumlahTampil: (nilai: number) => void;
};

export default function KontrolKatalog({
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
}: Props) {
  return (
    <div className="mb-4 flex flex-wrap gap-3">
      {/* Pencarian event */}
      <input
        value={cari}
        onChange={(e) => {
          setCari(e.target.value);
          setJumlahTampil(4);
        }}
        placeholder="Cari event..."
        className="rounded border bg-white p-3"
      />

      {/* Pilihan kategori */}
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

      {/* Pengurutan event */}
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

      {/* Harga maksimal */}
      <input
        type="number"
        min="0"
        value={hargaMaksimal}
        onChange={(e) => {
          setHargaMaksimal(e.target.value);
          setJumlahTampil(4);
        }}
        placeholder="Harga maksimal"
        className="rounded border bg-white p-3"
      />

      {/* Checkbox tiket tersedia */}
      <label className="flex items-center gap-2">
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
    </div>
  );
}
