import { fetchGlossaryById } from "@/app/lib/strapi-actions";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentRenderer } from "@/app/ui/Glossary/GlossaryContentRender";
import { GlossaryItemNavigation } from "@/app/ui/Glossary/GlossaryItemNavigation";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = Number(params?.id);
  const glossary = await fetchGlossaryById(id);
  const title = glossary?.attributes?.title || "title";
  return {
    title: `Glossary ${title}`,
    description: "Glossary list item",
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params?.id);
  const response = await fetchGlossaryById(id);
  const { attributes } = response || {};

  if (!attributes) {
    notFound();
  }
  const { title = "", description = "", firstBase } = attributes;

  return (
    <div key={`${id}/${title}`} className="flex py-8 text-slate-700 md:px-6">
      <GlossaryItemNavigation />
      <div className="flex flex-col tablet:w-8/12">
        <div>
          <Link href={`/glossary`}>
            <span className=" transition-all hover:text-blue-300">
              GLOSSARY
            </span>
          </Link>
          <span> / {title.toUpperCase()}</span>
        </div>
        <h2 className="py-5 text-5xl">{title}</h2>
        <div className="flex rounded-md bg-sky-100 px-6 py-7">
          <p className="text-xl">{description}</p>
        </div>
        <div>
          <ContentRenderer data={firstBase} />
        </div>
      </div>
    </div>
  );
}
