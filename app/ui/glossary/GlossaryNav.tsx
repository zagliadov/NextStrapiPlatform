"use client";

import { fetcher } from "@/app/lib/helpers";
import { FC } from "react";
import useSWR from "swr";
import * as _ from "lodash";
import { IGlossary } from "@/app/lib/definitions";
import { GlossaryLetter } from "./GlossaryLetter";
import { GlossaryNavSkeleton } from "./skeletons";

export const GlossaryNav: FC = () => {
  const { data: glossaries, isLoading } = useSWR<IGlossary[]>(
    "api/glossary",
    fetcher
  );

  const alphabet = _.map(_.range(65, 91), (n) => String.fromCharCode(n));

  const groupedGlossaries = _.uniq(
    _.map(glossaries, (glossary) => {
      return _.toUpper(_.trim(glossary?.attributes.name)[0]);
    })
  );

  if (isLoading) return <GlossaryNavSkeleton />;

  return (
    <div className="pr-6 order-last md:order-none">
      <div className="sticky top-[100px] flex flex-col pt-2">
        {_.map(groupedGlossaries, (letter) => {
          return <GlossaryLetter letter={letter} key={letter} />;
        })}
      </div>
    </div>
  );
};
