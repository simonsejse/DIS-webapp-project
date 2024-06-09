import { prisma } from '@/lib/prisma';
import {
  ErrorResponseBuilder,
  SuccessResponseBuilder,
} from '@/lib/response-builder';

export async function POST(req: Request): Promise<Response> {
  const { regnskabId, activeMonthlyFinanceId, name, price, quantity } =
    await req.json();

  if (!regnskabId || !activeMonthlyFinanceId || !name || !price || !quantity) {
    return ErrorResponseBuilder.create()
      .status(400)
      .message('Du mangler at udfylde et eller flere felter.')
      .build();
  }

  // Parse price and quantity as numbers, if not a number return 400
  const parsedPrice = parseFloat(price);
  const parsedQuantity = parseInt(quantity, 10);

  if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
    return ErrorResponseBuilder.create()
      .status(400)
      .message('Pris og mængde skal være tal.')
      .build();
  }

  try {
    await prisma.transaction.create({
      data: {
        item_name: name,
        price: parsedPrice,
        quantity: parsedQuantity,
        transaction_date: new Date(), // TODO: make user date input in trans-modal-form
        monthlyFinanceId: activeMonthlyFinanceId,
      },
    });
  } catch (error) {
    console.error(error);
    return ErrorResponseBuilder.create()
      .status(500)
      .message('Der skete en uventet fejl.')
      .build();
  }
  return SuccessResponseBuilder.create()
    .status(201)
    .message(`Din transaktionen ${parsedQuantity}x ${name} blev oprettet.`)
    .build();
}
