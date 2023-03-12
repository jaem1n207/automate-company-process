import { type Translations } from "./language";

export type UpdateLangFilesBodyType = {
  langPath: string;
  key: string;
  translations: Translations;
};
export type UpdateLangFilesReturnType = { message: string };

export type KeyExistsInLangFilesParamsType = {
  langPath: string;
  key: string;
};
export type KeyExistsInLangFilesReturnType = { message: string };

export type ReadLangFilesParamsType = {
  langPath: string;
};
export type ReadLangFIlesReturnType = {
  message: string;
};
