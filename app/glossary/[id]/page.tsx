import { fetchGlossaryById } from "@/app/lib/strapi-actions";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentRenderer } from "@/app/ui/Glossary/GlossaryContentRender";
import { GlossaryItemNavigation } from "@/app/ui/Glossary/GlossaryItemNavigation";
import * as _ from "lodash";
import { ArticleData, ContentItem } from "@/app/lib/definitions";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id: number = Number(_.get(params, "id", 1));
  const glossary: ArticleData = await fetchGlossaryById(id);
  const title: string = _.get(glossary, "attributes.title", "title");
  return {
    title: `Glossary ${title}`,
    description: "Glossary list item",
  };
}

export default async function Page({ params }: Props) {
  const id: number = Number(_.get(params, "id", 1));
  const response: ArticleData = await fetchGlossaryById(id);
  const attributes: ContentItem[] = _.get(response, "attributes", []);

  if (!attributes) {
    notFound();
  }

  const title: string = _.get(attributes, "title", "");
  const description: string = _.get(attributes, "description", "");
  const firstBase: ContentItem[] = _.get(attributes, "firstBase", []);

  return (
    <div
      key={`${id}/${title}`}
      className="flex py-8 text-slate-700 px-4 tablet:px-6"
    >
      <div className="tablet:w-4/12">
        <GlossaryItemNavigation />
      </div>
      <div className="flex flex-col tablet:w-8/12">
        <div>
          <Link href={`/glossary`}>
            <span className=" transition-all hover:text-blue-300">
              GLOSSARY
            </span>
          </Link>
          <span> / {_.toUpper(title)}</span>
        </div>
        <h2 className="py-5 text-5xl">{title}</h2>
        <div className="flex rounded-md bg-sky-100 px-6 py-7">
          <p className="text-xl">{description}</p>
        </div>
        <ContentRenderer data={firstBase} />
      </div>
    </div>
  );
}
