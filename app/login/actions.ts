"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NAMA_COOKIE, UMUR_SESI, buatToken } from "@/lib/sesi";

export type HasilMasuk = { pesan: string };

export async function masuk(
  _sebelum: HasilMasuk,
  formData: FormData,
): Promise<HasilMasuk> {
  const sandi = String(formData.get("sandi") ?? "");
  const dari = String(formData.get("dari") ?? "");

  if (sandi !== process.env.ADMIN_PASSWORD) {
    return { pesan: "Kata sandi salah." };
  }

  (await cookies()).set(NAMA_COOKIE, await buatToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: UMUR_SESI,
  });

  // Hanya boleh kembali ke halaman admin.
  redirect(dari.startsWith("/admin") ? dari : "/admin");
}

export async function keluar() {
  (await cookies()).delete(NAMA_COOKIE);
  redirect("/login");
}
