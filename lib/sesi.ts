import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const NAMA_COOKIE = "admin_sesi";
export const UMUR_SESI = 60 * 60 * 8; // 8 jam, dalam detik

// Tanda tangan hanya dibuat di server yang tahu SESSION_SECRET.
async function tandatangani(data: string) {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET belum diatur");
  }

  const kunci = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const hasil = await crypto.subtle.sign(
    "HMAC",
    kunci,
    new TextEncoder().encode(data),
  );

  return Array.from(new Uint8Array(hasil))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function buatToken() {
  const batas = String(Date.now() + UMUR_SESI * 1000);

  return `${batas}.${await tandatangani(batas)}`;
}

export async function tokenSah(token: string | undefined) {
  if (!token) return false;

  const [batas, tanda] = token.split(".");

  if (!batas || !tanda) return false;

  if (!Number(batas) || Number(batas) < Date.now()) {
    return false;
  }

  return tanda === (await tandatangani(batas));
}

// Dipanggil di awal setiap halaman dan Server Action admin.
export async function pastikanAdmin() {
  const token = (await cookies()).get(NAMA_COOKIE)?.value;

  if (!(await tokenSah(token))) {
    redirect("/login");
  }
}
