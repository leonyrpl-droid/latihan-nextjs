import { ambilEvent } from "@/data/ambil";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const event = await ambilEvent(Number(id));

  if (!event) {
    return Response.json({ pesan: "Event tidak ditemukan" }, { status: 404 });
  }

  return Response.json(event);
}
