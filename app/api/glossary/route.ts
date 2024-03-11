import { ApiResponse, IGlossary, STypeKeys } from "@/app/lib/definitions";
import { NextResponse } from "next/server";
import * as _ from "lodash";

async function fetchAllPages(
  url: string,
  page = 1,
  allData: IGlossary[] = []
): Promise<IGlossary[]> {
  const response = await fetch(
    `${url}?pagination[page]=${page}&pagination[pageSize]=100`
  );
  const data: ApiResponse = await response.json();
  allData = _.concat(allData, data.data);
  const paginationPage: string = _.get(data, data.meta.pagination.page, "1");
  const paginationPageCount: string = _.get(data, data.meta.pagination.pageCount, "1");
  if (paginationPage < paginationPageCount) {
    return fetchAllPages(url, page + 1, allData);
  } else {
    return allData;
  }
}

export async function GET(req: Request) {
  try {
    const strapiUrl = `${process.env.STRAPI_URL}/glossaries`;
    const glossaries: IGlossary[] = await fetchAllPages(strapiUrl);

    return NextResponse.json(glossaries);
  } catch (error) {
    console.error("Strapi Error:", error);
    throw new Error("Failed to fetch all glossaries.");
  }
}
