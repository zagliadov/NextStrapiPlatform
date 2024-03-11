import { ReactNode } from "react";

export enum GTypeKeys {
  ID = "id",
  ATTRIBUTES = "attributes",
  NAME = "name",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  PUBLISHED_AT = "publishedAt",
}
export interface IGlossary {
  [GTypeKeys.ID]: number;
  [GTypeKeys.ATTRIBUTES]: {
    [GTypeKeys.NAME]: string;
    [GTypeKeys.CREATED_AT]: string;
    [GTypeKeys.UPDATED_AT]: string;
    [GTypeKeys.PUBLISHED_AT]: string;
  }
}

// Typing for Rich Text Strapi

export enum STypeKeys {
  TYPE = "type",
  CHILDREN = "children",
  LEVEL = "level",
  IMAGE = "image",
  FORMAT = "format",
  TEXT = "text",
  ID = "id",
  NAME = "name",
  ALT_TEXT = "alternativeText",
  URL = "url",
  CAPTION = "caption",
  WIDTH = "width",
  HEIGHT = "height",
  FORMATS = "formats",
  HASH = "hash",
  EXT = "ext",
  MIME = "mime",
  META = "meta",
  PATH = "path",
  SIZE = "size",
  PREVIEW_URL = "previewUrl",
  PROVIDER = "provider",
  PROVIDER_METADATA = "provider_metadata",
  CREATED_AT = "createAt",
  UPDATED_AT = "updatedAt",
  THUMBNAIL = "thumbnail",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  TITLE = "title",
  DESCRIPTION = "description",
  PUBLISHED_AT = "publishedAt",
  FIRST_BASE = "firstBase",
  GLOSSARY = "glossary",
  DATA = "data",
  ATTRIBUTES = "attributes",
  PAGINATION = "pagination",
  PAGE = "page",
  PAGE_SIZE = "pageSize",
  PAGE_COUNT = "pageCount",
  TOTAL = "total",
}

export type Pagination = {
  [STypeKeys.PAGE]: number;
  [STypeKeys.PAGE_SIZE]: number;
  [STypeKeys.PAGE_COUNT]: number;
  [STypeKeys.TOTAL]: number;
}
export type Meta = {
  [STypeKeys.PAGINATION]: Pagination;
}

export type HeadingProps = {
  [STypeKeys.LEVEL]: number;
  [STypeKeys.CHILDREN]: ReactNode;
  [STypeKeys.ID]: string;
};

export type ParagraphProps = {
  [STypeKeys.CHILDREN]: ReactNode;
};

export type ListItemProps = {
  [STypeKeys.CHILDREN]: ReactNode;
};

export type ChildrenItem = {
  [STypeKeys.TYPE]: string;
  [STypeKeys.TEXT]: string;
};
interface ImageFormat {
  [STypeKeys.NAME]: string;
  [STypeKeys.HASH]: string;
  [STypeKeys.EXT]: string;
  [STypeKeys.MIME]: string;
  [STypeKeys.PATH]: null | string;
  [STypeKeys.WIDTH]: number;
  [STypeKeys.HEIGHT]: number;
  [STypeKeys.SIZE]: number;
  [STypeKeys.URL]: string;
}

interface ImageFormats {
  [STypeKeys.THUMBNAIL]?: ImageFormat;
  [STypeKeys.SMALL]?: ImageFormat;
  [STypeKeys.MEDIUM]?: ImageFormat;
  [STypeKeys.LARGE]?: ImageFormat;
}

interface ImageAttributes {
  [STypeKeys.NAME]: string;
  [STypeKeys.ALT_TEXT]: string;
  [STypeKeys.URL]: string;
  [STypeKeys.CAPTION]: null | string;
  [STypeKeys.WIDTH]: number;
  [STypeKeys.HEIGHT]: number;
  [STypeKeys.FORMATS]: ImageFormats;
  [STypeKeys.HASH]: string;
  [STypeKeys.EXT]: string;
  [STypeKeys.MIME]: string;
  [STypeKeys.SIZE]: number;
  [STypeKeys.PREVIEW_URL]: null | string;
  [STypeKeys.PROVIDER]: string;
  [STypeKeys.PROVIDER_METADATA]: null | any;
  [STypeKeys.CREATED_AT]: string;
  [STypeKeys.UPDATED_AT]: string;
}

export interface TextChild {
  [STypeKeys.TYPE]: string;
  [STypeKeys.TEXT]: string;
}

export interface ContentItem {
  [STypeKeys.TYPE]: "heading" | "paragraph" | "image" | "list" | "list-item";
  [STypeKeys.CHILDREN]?: TextChild[];
  [STypeKeys.LEVEL]?: number;
  [STypeKeys.IMAGE]?: ImageAttributes;
  [STypeKeys.FORMAT]?: "unordered";
}

interface ArticleAttributes {
  [STypeKeys.TITLE]: string;
  [STypeKeys.DESCRIPTION]: string;
  [STypeKeys.CREATED_AT]: string;
  [STypeKeys.UPDATED_AT]: string;
  [STypeKeys.PUBLISHED_AT]: string;
  [STypeKeys.FIRST_BASE]: ContentItem[];
  [STypeKeys.GLOSSARY]?: {
    [STypeKeys.DATA]: {
      [STypeKeys.ID]: number;
      [STypeKeys.ATTRIBUTES]: {
        [STypeKeys.NAME]: string;
        [STypeKeys.CREATED_AT]: string;
        [STypeKeys.UPDATED_AT]: string;
        [STypeKeys.PUBLISHED_AT]: string;
      };
    };
  };
}

export interface ArticleData {
  [STypeKeys.ID]: number;
  [STypeKeys.ATTRIBUTES]: ArticleAttributes;
}

export enum MTypeKeys {
  META = "meta",
}
export interface ApiResponse {
  [STypeKeys.DATA]: IGlossary[];
  [MTypeKeys.META]: Meta;
}

export interface ContentRendererProps {
  [STypeKeys.DATA]: ContentItem[];
}