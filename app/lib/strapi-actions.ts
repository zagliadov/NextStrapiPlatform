import { revalidatePath } from 'next/cache';
import { fetcher } from './api';
import { IGlossary } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

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

export async function fetchGlossary(): Promise<IGlossary[]> {
  noStore();
  try {
    const strapiUrl = `${process.env.STRAPI_URL}/glossaries`;
    const glossaries = await fetchAllPages(strapiUrl);
    revalidatePath('/dashboard/glossary');
    return glossaries;
  } catch (err) {
    console.error('Strapi Error:', err);
    throw new Error('Failed to fetch all glossaries.');
  }
}

export async function fetchGlossaryById(id: number) {
  noStore();
  try {
    const response = await fetcher(`${process.env.STRAPI_URL}/glossary-contents/${id}?populate=*`);
    revalidatePath('/dashboard/glossary/:id');
    return response.data;
  } catch (err) {
    console.error('Strapi Error:', err);
    throw new Error('Failed to fetch glossary by id.');
  }
}