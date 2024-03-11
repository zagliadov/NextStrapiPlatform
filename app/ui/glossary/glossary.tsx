"use client";

import { FC } from "react";
import { IGlossary } from "@/app/lib/definitions";
import * as _ from "lodash";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/app/lib/helpers";
import { GlossarySkeleton } from "./skeletons";

export const Glossary: FC = () => {
  const { data: glossaries, isLoading } = useSWR<IGlossary[]>(
    "api/glossary",
    fetcher
  );

  // Grouping glossaries by the first letter of the name attribute
  const groupedGlossaries = _.chain(glossaries)
    .defaultTo([])
    .map((glossary) => {
      const letter = _.get(glossary, "attributes.name", "attribute");
      return {
        ...glossary,
        firstLetter: _.toUpper(_.head(_.trim(letter))),
      };
    })
    .groupBy("firstLetter")
    .value();

  if (isLoading) return <GlossarySkeleton />;

  return (
    <div>
      {_.map(
        _.sortBy(Object.entries(groupedGlossaries || {}), [0]),
        ([letter, nameGroups]) => {
          return (
            <div key={letter} id={letter}>
              <span className="flex py-4 text-7xl text-slate-700">
                {letter}
              </span>
              <div className="flex flex-wrap">
                {_.map(nameGroups, ({ id, attributes }) => {
                  return (
                    <div key={id} className="flex w-full md:w-1/3 py-4">
                      <Link href={`/glossary/${id}`}>
                        <span className="text-slate-700 hover:text-blue-300">
                          {_.get(attributes, "name", "Unknown")}
                        </span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
