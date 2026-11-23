import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NAMA_COOKIE, tokenSah } from "@/lib/sesi";
import FormMasuk from "@/components/FormMasuk";

export const metadata: Metadata = { title: "Masuk Admin" };

type Props = {
  searchParams: Promise<{ dari?: string }>;
};

export default async function Login({ searchParams }: Props) {
  const { dari } = await searchParams;

  // Sudah masuk? Tidak perlu melihat formulir lagi.
  if (await tokenSah((await cookies()).get(NAMA_COOKIE)?.value)) {
    redirect("/admin");
  }

  return <FormMasuk dari={typeof dari === "string" ? dari : "/admin"} />;
}
