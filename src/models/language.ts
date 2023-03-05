export type LanguageLabel = "ko" | "en" | "ja" | "vi";

export type Translations = {
  [key in LanguageLabel]?: string;
};
