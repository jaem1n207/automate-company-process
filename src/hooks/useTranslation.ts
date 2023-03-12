import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import { type Translations } from "@/models/language";
import { env } from "@/env.mjs";
import { isEmptryString } from "@/utils/assertions";

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
  const [translations, setTranslations] = useState<Translations>({
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
          key: env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY,
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
      setTranslations({ ko, en, ja, vi });
    } catch (error) {
      if (isEmptryString(text)) {
        toast("번역에 실패했어요. 번역할 값을 입력해주세요.", {
          type: "error",
        });
      } else {
        toast("번역에 실패했어요. 잠시 후 다시 시도해주세요.", {
          type: "info",
        });
      }
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
