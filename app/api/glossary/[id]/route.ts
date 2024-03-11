import { fetcher } from "@/app/lib/helpers";
import { ApiResponse, STypeKeys } from "@/app/lib/definitions";
import * as _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id: string = _.get(params, STypeKeys.ID, "10");
  try {
    const response: ApiResponse = await fetcher(
      `${process.env.STRAPI_URL}/glossary-contents/${id}?populate=*`
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("Strapi Error:", error);
    throw new Error("Failed to fetch glossary by id.");
  }
}
