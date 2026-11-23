import DaftarFavorit from "@/components/DaftarFavorit";
import { ambilEvents } from "@/data/ambil";

export default async function Favorit() {
  const events = await ambilEvents();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Event Favorit</h1>
      <DaftarFavorit events={events} />
    </div>
  );
}
