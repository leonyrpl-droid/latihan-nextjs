
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { keluar } from "@/app/login/actions";
import { pastikanAdmin } from "@/lib/sesi";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s - Admin" },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await pastikanAdmin();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between rounded-lg bg-slate-800 px-4 py-2 text-white">
        <span className="font-semibold">Panel Admin</span>

        <form action={keluar}>
          <button className="text-sm underline">Keluar</button>
        </form>
      </div>

      {children}
    </div>
  );
}
