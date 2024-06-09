import { prisma } from '@/lib/prisma';
import {
  ErrorResponseBuilder,
  SuccessResponseBuilder,
} from '@/lib/response-builder';

export async function POST(req: Request) {
  const { categoryId, name, description } = await req.json();

  if (!categoryId || !name || !description) {
    return ErrorResponseBuilder.create().message('Invalid request').build();
  }

  try {
    const subcategory = await prisma.subCategory.create({
      data: {
        title: name,
        description,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });

    return SuccessResponseBuilder.create()
      .message('Underkategori oprettet')
      .build();
  } catch (error) {
    return SuccessResponseBuilder.create().message('Der skete en fejl').build();
  }
}
