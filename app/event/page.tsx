import { events } from "@/events";
import KartuEvent from "@/components/KartuEvents";

export default function Katalog() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        Katalog Event
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => (
          <KartuEvent key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}