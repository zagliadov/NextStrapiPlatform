import { ReactNode } from "react";

export interface IGlossary {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
}

// Typing for Rich Text Strapi

export type ContentRenderProps = {
  type: string;
  children: ChildrenItem;
};

export type HeadingProps = {
  level: number;
  children: ReactNode;
};

export type ParagraphProps = {
  children: ReactNode;
};

export type ListItemProps = {
  children: ReactNode;
};

export type ChildrenItem = {
  type: string;
  text: string;
};

export type UnorderedListProps = {
  type: string;
  children: ChildrenItem[];
};