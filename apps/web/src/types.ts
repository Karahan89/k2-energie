import type {
  QueryHomePageDataResult,
  QueryImageTypeResult,
} from "@/lib/sanity/sanity.types";

export type PageBuilderBlockTypes = NonNullable<
  NonNullable<QueryHomePageDataResult>["pageBuilder"]
>[number]["_type"];

export type PagebuilderType<T extends PageBuilderBlockTypes> = Extract<
  NonNullable<NonNullable<QueryHomePageDataResult>["pageBuilder"]>[number],
  { _type: T }
>;

export type SanityButtonProps = NonNullable<
  NonNullable<PagebuilderType<"hero">>["buttons"]
>[number];

export type SanityImageProps = NonNullable<QueryImageTypeResult>;

export type SanityRichTextBlock = {
  _type?: string;
  children?: readonly unknown[];
  [key: string]: unknown;
};

export type SanityRichTextProps =
  | readonly SanityRichTextBlock[]
  | null
  | undefined;

export type Maybe<T> = T | null | undefined;
