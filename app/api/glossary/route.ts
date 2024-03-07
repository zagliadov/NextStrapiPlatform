import { IGlossary } from "@/app/lib/definitions";
import { NextResponse } from "next/server";


async function fetchAllPages(url: string, page = 1, allData: IGlossary[] = []): Promise<IGlossary[]> {
  const response = await fetch(`${url}?pagination[page]=${page}&pagination[pageSize]=100`);
  const data = await response.json();

  allData = allData.concat(data.data);

  if (data.meta.pagination.page < data.meta.pagination.pageCount) {
    return fetchAllPages(url, page + 1, allData);
  } else {
    return allData;
  }
}

export async function GET(req: Request) {
  try {
    const strapiUrl = `${process.env.STRAPI_URL}/glossaries`;
    const glossaries = await fetchAllPages(strapiUrl);

    return NextResponse.json(glossaries);
  } catch (error) {
    console.error('Strapi Error:', error);
    throw new Error('Failed to fetch all glossaries.');
  }
}