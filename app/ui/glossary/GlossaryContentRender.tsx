import {
  ContentItem,
  ContentRendererProps,
  HeadingProps,
  ListItemProps,
  ParagraphProps,
  STypeKeys,
} from "@/app/lib/definitions";
import Image from "next/image";
import * as _ from "lodash";
import { FC } from "react";
import {
  safeGetChildrenProperty,
  safeGetImageProperty,
  safeGetListItemsTexts,
} from "@/app/lib/helpers";

const Heading: React.FC<HeadingProps> = ({ level, children, id }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag className="pt-6 text-3xl font-semibold" id={id}>
      {children}
    </Tag>
  );
};

const Paragraph: React.FC<ParagraphProps> = ({ children }) => (
  <p className="pt-4">{children}</p>
);

const ListItem: React.FC<ListItemProps> = ({ children }) => <li>{children}</li>;

interface IUnorderedListProps {
  items: string[];
}
const UnorderedList: React.FC<IUnorderedListProps> = ({ items }) => {
  return (
    <ul className="list-disc list-inside pt-2">
      {_.map(items, (item, index) => {
        return <ListItem key={index}>{item}</ListItem>;
      })}
    </ul>
  );
};

export const ContentRenderer: FC<ContentRendererProps> = ({ data }) => {
  return (
    <div>
      {_.map(data, (item, index) => {
        switch (item[STypeKeys.TYPE]) {
          case "heading":
            const headingText = safeGetChildrenProperty(
              item,
              STypeKeys.TEXT,
              "Default Heading Text"
            );
            const itemLevel = _.get(item, STypeKeys.LEVEL, 0);
            return (
              <Heading key={index} level={itemLevel} id={headingText}>
                {headingText}
              </Heading>
            );
          case "paragraph":
            const paragraphText = safeGetChildrenProperty(
              item,
              STypeKeys.TEXT,
              "Default Paragraph Text"
            );
            return <Paragraph key={index}>{paragraphText}</Paragraph>;
          case "image":
            const altText = safeGetImageProperty(
              item,
              STypeKeys.ALT_TEXT,
              "Default Alternative Text"
            );
            const itemHash = safeGetImageProperty(item, STypeKeys.HASH);
            const itemExt = safeGetImageProperty(item, STypeKeys.EXT);
            const itemImageWidth = safeGetImageProperty(item, STypeKeys.WIDTH);
            const itemImageHeight = safeGetImageProperty(
              item,
              STypeKeys.HEIGHT
            );
            return (
              <Image
                key={index}
                src={`${process.env.STRAPI_BASE}/uploads/${itemHash}${itemExt}`}
                width={itemImageWidth}
                height={itemImageHeight}
                alt={altText}
                className="pt-6"
              />
            );
          case "list":
            const itemChildren = safeGetListItemsTexts(item);
            return <UnorderedList key={index} items={itemChildren} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

interface INavRenderedProps {
  data: ContentItem[];
}
export const NavRenderer: FC<INavRenderedProps> = ({ data }) => {
  return (
    <div className="sticky top-[200px] flex flex-col pt-2">
      {_.map(data, (item, index) => {
        switch (item[STypeKeys.TYPE]) {
          case "heading":
            const headingText = safeGetChildrenProperty(
              item,
              STypeKeys.TEXT,
              "Default Heading Text"
            );
            return (
              <a key={index} href={`#${headingText}`} className="py-4">
                {headingText}
              </a>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
