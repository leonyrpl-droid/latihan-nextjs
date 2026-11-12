
import Link from "next/link";
import { ambilTerkait } from "@/data/ambil";
import type { Event } from "@/events";

export default async function EventTerkait({
  event,
}: {
  event: Event;
}) {
  const terkait = await ambilTerkait(event);

  if (terkait.length === 0) {
    return (
      <p className="text-slate-500">
        Belum ada event terkait.
      </p>
    );
  }

  return (
    <ul className="mt-1 space-y-1">
      {terkait.map((e) => (
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
