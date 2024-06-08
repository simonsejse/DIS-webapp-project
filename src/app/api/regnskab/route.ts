import { prisma } from '@/lib/prisma';
import {
  ErrorResponseBuilder,
  SuccessResponseBuilder,
} from '@/lib/response-builder';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { navn, beskrivelse } = await req.json();

  // navn må ikke være tomt
  // navn skal være mellem 0<navn<50 tegn
  if (navn.length === 0 || navn.length > 50) {
    return new ErrorResponseBuilder()
      .message('Navn skal være mellem 0 og 50 tegn')
      .status(400)
      .build();
  }

  // beskrivelse må ikke være tom
  // beskrivelse skal være mellem 0<beskrivelse<200 tegn
  if (beskrivelse.length === 0 || beskrivelse.length > 200) {
    return new ErrorResponseBuilder()
      .message('Beskrivelse skal være mellem 0 og 200 tegn')
      .status(400)
      .build();
  }

  // nu kan der oprettes et regnskab
  const regnskab = {
    name: navn,
    description: beskrivelse,
  };
  try {
    await prisma.spreadsheet.create({
      data: regnskab,
    });
  } catch (error) {
    return new ErrorResponseBuilder()
      .message('Der skete en fejl')
      .status(500)
      .build();
  }

  return Response.json({ navn, beskrivelse });
}

export async function GET() {
  const regnskaber = await prisma.spreadsheet.findMany({
    select: {
      id: true,
      status: true,
      name: true,
      created_at: true,
      last_updated_at: true,
    },
  });
  if (!regnskaber) {
    return SuccessResponseBuilder.create().body([]).build();
  }

  return SuccessResponseBuilder.create().body(regnskaber).build();
}
