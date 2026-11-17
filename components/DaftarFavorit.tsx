"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { events } from "@/events";

function bacaFavorit() {
  try {
    return localStorage.getItem("favorit") ?? "[]";
  } catch {
    return "[]";
  }
}

function langganan(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("favorit-berubah", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("favorit-berubah", callback);
  };
}

function favoritServer() {
  return "[]";
}

export default function DaftarFavorit() {
  const data = useSyncExternalStore(langganan, bacaFavorit, favoritServer);

  let ids: number[] = [];

  try {
    const tersimpan = JSON.parse(data);
    ids = Array.isArray(tersimpan)
      ? tersimpan.filter((id): id is number => typeof id === "number")
      : [];
  } catch {
    ids = [];
  }

  const daftar = events.filter((e) => ids.includes(e.id));

  if (daftar.length === 0) {
    return <p className="text-slate-500">Belum ada favorit.</p>;
  }

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
