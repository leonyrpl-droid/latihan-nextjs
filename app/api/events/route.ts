import { ambilEvents } from "@/data/ambil";

export async function GET() {
  return Response.json(await ambilEvents());
}
