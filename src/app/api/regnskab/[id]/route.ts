import { prisma } from "@/lib/prisma";
import { ResponseBuilder } from "@/lib/responseBuilder";
import { parseNumber } from "@/lib/utils";

type Props = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: Props) {
  const find_id = parseNumber(params.id);
  if (!find_id) {
    return ResponseBuilder.create().status(400).message("Ugyldigt id").build();
  }

  const spread = await prisma.spreadsheet.findFirst({ where: { id: find_id } });
  if (!spread) {
    return ResponseBuilder.create()
      .status(404)
      .message("Kunne ikke finde spreadsheet")
      .build();
  }
  return ResponseBuilder.create().body(spread).build();
}
