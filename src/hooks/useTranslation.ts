import axios from "axios";
import { useState } from "react";

const API_ENDPOINT = "https://translation.googleapis.com/language/translate/v2";

type TranslatedText = string | undefined;

interface UseTranslateResult {
  ko: TranslatedText;
  en: TranslatedText;
  ja: TranslatedText;
  vi: TranslatedText;
  isLoading: boolean;
  translateText: (text: string) => Promise<void>;
}

type ResponseTranslate = {
  data: {
    translations: {
      translatedText: string;
    }[];
  };
};

export const useTranslate = (): UseTranslateResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [translations, setTranslations] = useState({
    ko: undefined,
    en: undefined,
    ja: undefined,
    vi: undefined,
  });

  const translate = async (text: string, targetLang: string) => {
    const { data } = await axios.post<ResponseTranslate>(
      API_ENDPOINT,
      {
        q: text,
        target: targetLang,
      },
      {
        params: {
          key: "AIzaSyDQrxShV3XQsYSk6Kq_-tQefpvL8rnampQ",
        },
      }
    );

    if (!data.data.translations[0]?.translatedText) {
      throw new Error("No translation found");
    }

    return data.data.translations[0].translatedText;
  };

  const translateText = async (text: string): Promise<void> => {
    setIsLoading(true);
    try {
      const [ko, en, ja, vi] = await Promise.all<TranslatedText>([
        translate(text, "ko"),
        translate(text, "en"),
        translate(text, "ja"),
        translate(text, "vi"),
      ]);
      if (!ko || !en || !ja || !vi) {
        throw new Error("No translation found");
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setTranslations({ ko, en, ja, vi });
    } catch (error) {
      console.error(error);
      setTranslations({
        ko: undefined,
        en: undefined,
        ja: undefined,
        vi: undefined,
      });
    }
    setIsLoading(false);
  };

  return {
    ko: translations.ko,
    en: translations.en,
    ja: translations.ja,
    vi: translations.vi,
    isLoading,
    translateText,
  };
};
