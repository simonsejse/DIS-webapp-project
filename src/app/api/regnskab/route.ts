import { prisma } from "@/lib/prisma";
import { ResponseBuilder } from "@/lib/responseBuilder";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { navn, beskrivelse } = await req.json();

    // navn må ikke være tomt
    // navn skal være mellem 0<navn<50 tegn
    if (navn.length === 0 || navn.length > 50) {
        return new ResponseBuilder()
            .message("Navn skal være mellem 0 og 50 tegn")
            .status(400)
            .build();
    }

    // beskrivelse må godt være tom
    // beskrivelse skal være mellem 0<beskrivelse<200 tegn

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
        return new ResponseBuilder()
            .message("Der skete en fejl")
            .status(500)
            .build();
    }

    return Response.json({ navn, beskrivelse });
}
