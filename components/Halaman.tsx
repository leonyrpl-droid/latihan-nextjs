import Link from "next/link";
import { alamatHalaman, type Saringan } from "@/data/saring";

type Props = {
  s: Saringan;
  hal: number;
  jumlah: number;
};

export default function Halaman({ s, hal, jumlah }: Props) {
  if (jumlah <= 1) return null;

  const nomorHalaman = Array.from({ length: jumlah }, (_, i) => i + 1);

  return (
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-2">
      {hal > 1 && (
        <Link
          href={alamatHalaman(s, hal - 1)}
          className="rounded border px-3 py-2"
        >
          « Sebelumnya
        </Link>
      )}

      {nomorHalaman.map((nomor) => (
        <Link
          key={nomor}
          href={alamatHalaman(s, nomor)}
          className={
            nomor === hal
              ? "rounded bg-blue-600 px-4 py-2 font-bold text-white"
              : "rounded border px-4 py-2"
          }
        >
          {nomor}
        </Link>
      ))}

      {hal < jumlah && (
        <Link
          href={alamatHalaman(s, hal + 1)}
          className="rounded border px-3 py-2"
        >
          Berikutnya »
        </Link>
      )}
    </nav>
  );
}
