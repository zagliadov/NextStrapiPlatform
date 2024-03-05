import { IGlossary } from '@/app/lib/definitions';
import { fetchGlossary } from '@/app/lib/strapi-actions';
import * as _ from 'lodash';
import Link from 'next/link';

export default async function Glossary() {
  const glossaries: IGlossary[] = await fetchGlossary();

  // Grouping glossaries by the first letter of the name attribute
  const groupedGlossaries = _.groupBy(glossaries, (glossary) =>
    glossary.attributes.name.trim()[0].toUpperCase(),
  );

  return (
    <div>
      {groupedGlossaries && Object.entries(groupedGlossaries)
        .sort()
        .map(([letter, nameGroups]) => {
          return (
            <div key={letter} id={letter}>
              <span className="flex py-4 text-7xl text-slate-700">
                {letter}
              </span>
              <div className="flex flex-wrap">
                {nameGroups && nameGroups.map(({id, attributes}) => {
                  return (
                    <div key={id} className="flex w-full md:w-1/3 py-4">
                      <Link href={`/glossary/${id}`}>
                        <span className="text-slate-700 hover:text-blue-300">{attributes?.name}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}