import { IGlossary } from '@/app/lib/definitions';
import { fetchGlossary } from '@/app/lib/strapi-actions';
import * as _ from 'lodash';

export default async function GlossaryNav() {
  const glossaries: IGlossary[] = await fetchGlossary();

  // Grouping glossaries by the first letter of the name attribute
  const groupedGlossaries = _.uniq(
    _.map(glossaries, (glossary) => {
      return _.toUpper(_.trim(glossary?.attributes.name)[0]);
    }),
  );

  return (
    <div className="pr-6 order-last md:order-none">
      <div className="sticky top-[100px] flex flex-col pt-2">
        {groupedGlossaries &&
          _.map(groupedGlossaries, (letter) => {
            return (
              <a
                key={letter}
                href={`#${letter}`}
                className="flex justify-center border-b p-4 text-lg font-semibold text-slate-700 hover:text-slate-400"
              >
                {letter}
              </a>
            );
          })}
      </div>
    </div>
  );
}