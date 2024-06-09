import { prisma } from '@/lib/prisma';
import {
  ErrorResponseBuilder,
  SuccessResponseBuilder,
} from '@/lib/response-builder';

export async function POST(req: Request) {
  const { regnskabId, name, description } = await req.json();

  if (!regnskabId || !name) {
    return ErrorResponseBuilder.create().message('Invalid request').build();
  }

  try {
    const category = await prisma.category.create({
      data: {
        title: name,
        description: description || '',
        spreadsheet: {
          connect: {
            id: regnskabId,
          },
        },
      },
    });

    return SuccessResponseBuilder.create()
      .message(`Du har oprettet kategorien '${name}'`)
      .build();
  } catch (error) {
    return SuccessResponseBuilder.create().message('Der skete en fejl').build();
  }
}
