import { FC } from "react";
import * as _ from "lodash";

const alphabet = _.map(_.range(65, 91), (n) => String.fromCharCode(n));

export const GlossaryNavSkeleton: FC = () => {
  return (
    <div className="pr-6 order-last md:order-none">
      <div className="sticky opacity-40 top-[100px] flex flex-col pt-2">
        {_.map(alphabet, (letter) => {
          return (
            <div
              key={letter}
              className="flex skeleton mb-1 opacity-80 border-b justify-center p-4 text-lg font-semibold text-slate-700"
            >
              {letter}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const GlossarySkeleton: FC = () => {
  return (
    <div className="w-full">
      {_.times(26, (i) => (
        <div key={i} className="">
          <div className="flex py-4">
            <div className="h-20 w-20 rounded skeleton"></div>
          </div>
          <div className="flex justify-between flex-wrap">
            {_.times(7, (j) => (
              <div
                key={j}
                className="h-6 rounded flex w-full mb-6 mr-2 md:w-3/12 py-4 skeleton"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const GlossaryItemNavigationSkeleton: FC = () => {
  return (
    <div className="sticky top-[210px]">
      <div className="skeleton w-5/12 h-5"></div>
      <div className="pl-4">
        <div className="skeleton w-7/12 h-5 mt-2"></div>
        <div className="skeleton w-9/12 h-5 mt-2"></div>
        <div className="skeleton w-6/12 h-5 mt-2"></div>
      </div>
    </div>
  );
};
