import { fetcher } from "@/app/lib/helpers";
import { IGlossary } from "@/app/lib/definitions";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const response = await fetcher(
      `${process.env.STRAPI_URL}/glossary-contents/${id}?populate=*`
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("Strapi Error:", error);
    throw new Error("Failed to fetch glossary by id.");
  }
}
