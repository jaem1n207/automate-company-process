import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

type TranslationResponse = {
  data: {
    translations: {
      translatedText: string;
    }[];
  };
};

const TRANSLATION_API_URL =
  "https://translation.googleapis.com/language/translate/v2";

export default async function handleTranslation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { text } = req.body as { text: string };

  // Define the target languages
  const targetLangs = ["ko", "en", "ja", "vi"];

  // Build the requests for each target language
  const requests = targetLangs.map((lang) => ({
    method: "POST",
    // FIXME: use env
    url: `${TRANSLATION_API_URL}?key=AIzaSyDQrxShV3XQsYSk6Kq_-tQefpvL8rnampQ`,
    data: {
      q: text,
      target: lang,
    },
  }));

  // Send the requests in parallel
  const responses: TranslationResponse[] = await Promise.all(
    requests.map((req) => axios(req))
  );

  // Extract the translated text from each response
  const translations: string[] = responses.map((res) => {
    if (res.data.translations.length === 0) {
      throw new Error("No translation found");
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return res.data.translations[0]!.translatedText;
  });
  console.log(
    "🚀 ~ file: translate.ts:54 ~ consttranslations:string[]=responses.map ~ translations:",
    translations
  );

  // Send the translations in the response
  const [ko, en, ja, vi] = translations;
  res.status(200).json({ ko, en, ja, vi });
}
