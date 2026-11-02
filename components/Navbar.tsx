
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center gap-6 border-b bg-white px-6 py-3">
      <span className="text-lg font-bold text-blue-600">
        EventKu
      </span>
      <Link href="/" className="text-slate-600 hover:text-blue-600">
        Beranda
      </Link>
      <Link href="/event" className="text-slate-600 hover:text-blue-600">
        Event
      </Link>
      <Link href="/tentang" className="text-slate-600 hover:text-blue-600">
        Tentang
      </Link>
    </nav>
  );
}
