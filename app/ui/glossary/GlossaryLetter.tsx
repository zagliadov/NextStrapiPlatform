"use client";

import { FC } from "react";

interface IProps {
  letter: string;
}
export const GlossaryLetter: FC<IProps> = ({ letter }) => {
  return (
    <a
      key={letter}
      href={`#${letter}`}
      className="flex justify-center border-b p-4 text-lg font-semibold text-slate-700 hover:text-slate-400"
    >
      {letter}
    </a>
  );
};
