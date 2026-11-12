import { ambilEvents } from "@/data/ambil";
import KatalogInteraktif from "@/components/KatalogInteraktif";

export default async function Katalog() {
  const events = await ambilEvents();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Katalog Event</h1>

      <KatalogInteraktif events={events} />
    </div>
  );
}
