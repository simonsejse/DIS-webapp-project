import { prisma } from '@/lib/prisma';
import {
  ErrorResponseBuilder,
  SuccessResponseBuilder,
} from '@/lib/response-builder';

export async function POST(req: Request) {
  const { categoryId, name, description } = await req.json();

  if (!categoryId || !name) {
    return ErrorResponseBuilder.create()
      .message('Der skete en fejl, tjek dine inputs')
      .build();
  }

  try {
    const subcategory = await prisma.subCategory.create({
      data: {
        title: name,
        description: description || '',
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });

    return SuccessResponseBuilder.create()
      .message(`Du har oprettet underkategorien '${name}'`)
      .build();
  } catch (error) {
    return SuccessResponseBuilder.create().message('Der skete en fejl').build();
  }
}
