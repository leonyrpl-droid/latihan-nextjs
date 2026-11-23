"use client";

import { useActionState } from "react";
import { masuk, type HasilMasuk } from "@/app/login/actions";

export default function FormMasuk({ dari }: { dari: string }) {
  const [hasil, kirim, sedangKirim] = useActionState<HasilMasuk, FormData>(
    masuk,
    { pesan: "" },
  );

  return (
    <form
      action={kirim}
      className="mx-auto max-w-sm space-y-3 rounded-xl border bg-white p-6"
    >
      <h1 className="text-xl font-bold">Masuk Admin</h1>

      <input type="hidden" name="dari" value={dari} />

      <input
        type="password"
        name="sandi"
        placeholder="Kata sandi"
        className="block w-full rounded border px-3 py-2"
      />

      {hasil.pesan && <p className="text-sm text-red-600">{hasil.pesan}</p>}

      <button
        disabled={sedangKirim}
        className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {sedangKirim ? "Memeriksa..." : "Masuk"}
      </button>
    </form>
  );
}
