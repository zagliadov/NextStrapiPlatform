import {
  ContentRenderProps,
  HeadingProps,
  ListItemProps,
  ParagraphProps,
  UnorderedListProps,
} from "@/app/lib/definitions";
import Image from "next/image";
import * as _ from "lodash";

const Heading: React.FC<HeadingProps> = ({ level, children }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className="pt-6 text-3xl font-semibold">{children}</Tag>;
};

const Paragraph: React.FC<ParagraphProps> = ({ children }) => (
  <p className="pt-4">{children}</p>
);

const ListItem: React.FC<ListItemProps> = ({ children }) => <li>{children}</li>;

const UnorderedList: React.FC<{ items: UnorderedListProps[] }> = ({
  items,
}) => {
  return (
    <ul className="list-disc list-inside pt-2">
      {_.map(items, (item, index) => {
        return <ListItem key={index}>{item.children[0].text}</ListItem>;
      })}
    </ul>
  );
};

export const ContentRenderer = ({ data }: { data: ContentRenderProps[] }) => {
  return (
    <div>
      {_.map(data, (item: any, index: number) => {
        switch (item.type) {
          case "heading":
            return (
              <Heading key={index} level={item.level}>
                {item.children[0].text}
              </Heading>
            );
          case "paragraph":
            return <Paragraph key={index}>{item.children[0].text}</Paragraph>;
          case "image":
            return (
              <Image
                key={index}
                src={`${process.env.STRAPI_BASE}/uploads/${item.image.hash}${item.image.ext}`}
                width={item.image.width}
                height={item.image.height}
                alt={item.image.alternativeText}
                className="pt-6"
              />
            );
          case "list":
            return <UnorderedList key={index} items={item.children} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
