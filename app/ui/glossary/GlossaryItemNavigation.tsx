"use client";

import { FC } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/app/lib/helpers";
import { NavRenderer } from "./GlossaryContentRender";

export const GlossaryItemNavigation: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: glossaryItem, isLoading } = useSWR(`/api/glossary/${id}`, fetcher);

  if (isLoading) return null;

  const { attributes } = glossaryItem.data || {};
  const { firstBase } = attributes || {};

  return (
    <div className="tablet:w-4/12">
      <NavRenderer data={firstBase} />
    </div>
  )
};
