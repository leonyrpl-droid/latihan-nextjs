"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NAMA_COOKIE, UMUR_SESI, buatToken } from "@/lib/sesi";

export type HasilMasuk = { pesan: string };

const COOKIE_GAGAL = "admin_gagal";
const COOKIE_BLOKIR = "admin_blokir";
const BATAS_GAGAL = 5;
const DURASI_BLOKIR = 60;

export async function masuk(
  _sebelum: HasilMasuk,
  formData: FormData,
): Promise<HasilMasuk> {
  const sandi = String(formData.get("sandi") ?? "");
  const dari = String(formData.get("dari") ?? "");
  const cookieStore = await cookies();

  const waktuBlokir = Number(cookieStore.get(COOKIE_BLOKIR)?.value ?? 0);

  if (waktuBlokir > Date.now()) {
    const sisa = Math.ceil((waktuBlokir - Date.now()) / 1000);
    return {
      pesan: `Terlalu banyak percobaan. Coba lagi dalam ${sisa} detik.`,
    };
  }

  if (sandi !== process.env.ADMIN_PASSWORD) {
    const jumlahGagal = Number(cookieStore.get(COOKIE_GAGAL)?.value ?? 0) + 1;

    if (jumlahGagal >= BATAS_GAGAL) {
      cookieStore.delete(COOKIE_GAGAL);
      cookieStore.set(
        COOKIE_BLOKIR,
        String(Date.now() + DURASI_BLOKIR * 1000),
        {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: DURASI_BLOKIR,
        },
      );

      return {
        pesan: "Terlalu banyak percobaan. Login diblokir selama 1 menit.",
      };
    }

    cookieStore.set(COOKIE_GAGAL, String(jumlahGagal), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 300,
    });

    return { pesan: `Kata sandi salah. Percobaan ${jumlahGagal} dari 5.` };
  }

  cookieStore.delete(COOKIE_GAGAL);
  cookieStore.delete(COOKIE_BLOKIR);

  cookieStore.set(NAMA_COOKIE, await buatToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: UMUR_SESI,
  });

  redirect(dari.startsWith("/admin") ? dari : "/admin");
}

export async function keluar() {
  const cookieStore = await cookies();
  cookieStore.delete(NAMA_COOKIE);
  redirect("/login");
}
