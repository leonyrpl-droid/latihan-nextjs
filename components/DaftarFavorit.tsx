
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Event } from "@/events";

export default function DaftarFavorit() {
  const [semua, setSemua] = useState<Event[]>([]);
  const [ids, setIds] = useState<number[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState("");

  useEffect(() => {
    setIds(JSON.parse(localStorage.getItem("favorit") ?? "[]"));

    fetch("/api/events")
      .then((r) => {
        if (!r.ok) throw new Error("Gagal mengambil data");
        return r.json();
      })
      .then((d: Event[]) => setSemua(d))
      .catch((e: Error) => setGalat(e.message))
      .finally(() => setMemuat(false));
  }, []);

  if (memuat) return <p>Memuat...</p>;
  if (galat) return <p className="text-red-600">{galat}</p>;

  const daftar = semua.filter((e) => ids.includes(e.id));

  if (daftar.length === 0)
    return <p className="text-slate-500">Belum ada favorit.</p>;

  return (
    <ul className="space-y-2">
      {daftar.map((e) => (
        <li key={e.id}>
          <Link
            href={`/event/${e.id}`}
            className="text-blue-600 hover:underline"
          >
            {e.judul}
          </Link>
        </li>
      ))}
    </ul>
  );
}
