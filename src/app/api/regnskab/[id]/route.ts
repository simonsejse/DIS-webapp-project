import { prisma } from "@/lib/prisma";
import {
    ErrorResponseBuilder,
    SuccessResponseBuilder,
} from "@/lib/responseBuilder";
import { parseNumber } from "@/lib/utils";

type Props = {
    params: {
        id: string;
    };
};

export async function GET(request: Request, { params }: Props) {
    const find_id = parseNumber(params.id);
    if (!find_id) {
        return ErrorResponseBuilder.create()
            .status(400)
            .message("Ugyldigt id")
            .ismajor(true)
            .build();
    }

    const spread = await prisma.spreadsheet.findFirst({
        where: { id: find_id },
        include: {
            categories: {
                include: {
                    subcategories: {
                        include: {
                            monthlyFinances: {
                                include: {
                                    transactions: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!spread) {
        return ErrorResponseBuilder.create()
            .status(404)
            .message("Kunne ikke finde spreadsheet")
            .ismajor(true)
            .build();
    }
    return SuccessResponseBuilder.create().body(spread).build();
}
