"use client";

import { FC } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/app/lib/helpers";
import { NavRenderer } from "./GlossaryContentRender";
import * as _ from "lodash";
import { GlossaryItemNavigationSkeleton } from "./skeletons";

export const GlossaryItemNavigation: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: glossaryItem, isLoading } = useSWR(
    `/api/glossary/${id}`,
    fetcher
  );
  if (isLoading) return <GlossaryItemNavigationSkeleton />
  const firstBase = _.get(glossaryItem, "data.attributes.firstBase", {});

  return <NavRenderer data={firstBase} />;
};
