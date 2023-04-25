import { type NextApiRequest, type NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { type Translations } from "@/models/language";
import {
  type UpdateLangFilesBodyType,
  type UpdateLangFilesReturnType,
} from "@/models/api";

interface LangData {
  [key: string]: string;
}

interface LangFile {
  lang: string;
  data: LangData;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateLangFilesReturnType>
) {
  if (req.method === "POST") {
    const body: UpdateLangFilesBodyType = req.body as UpdateLangFilesBodyType;
    const { langPath, key, translations } = body;

    let errorMessage = "";
    let message = "";

    const requiredFields = ["langPath", "key", "translations"];
    for (const field of requiredFields) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!body[field]) {
        errorMessage = `'${field}'필드가 입력되지 않았어요.`;
        return res.status(400).json({ message: errorMessage });
      }
    }

    try {
      /**
       * 주어진 경로에서 존재하는 모든 언어 파일을 가져옵니다.
       */
      function readLangFiles(langPath: string): LangFile[] {
        const files = fs.readdirSync(langPath);
        console.log(
          "🚀 ~ file: updateLangFiles.ts:46 ~ readLangFiles ~ files:",
          files
        );

        return files
          .filter((file) => file.endsWith(".lang.json"))
          .map((file) => {
            const lang = file.replace(".lang.json", "");
            const data = JSON.parse(
              fs.readFileSync(path.join(langPath, file), "utf-8")
            ) as LangData;
            return { lang, data };
          });
      }

      /**
       * 주어진 키가 주어진 언어 파일에 있는지 확인합니다.
       */
      function keyExistsInLangFiles(
        langPath: string,
        key: string
      ): LangFile | null {
        const langFiles = readLangFiles(langPath);
        for (const langFile of langFiles) {
          if (key in langFile.data) {
            return langFile;
          }
        }
        return null;
      }

      /**
       * 주어진 키를 해당하는 각 언어 파일에 추가합니다.
       */
      function updateLangFiles(
        langPath: string,
        key: string,
        translations: Translations
      ): void {
        const existingKeyFile = keyExistsInLangFiles(langPath, key);
        if (existingKeyFile) {
          console.error(
            `Key '${key}' already exists in file '${existingKeyFile.lang}.lang.json'`
          );
          errorMessage = `'${key}'키는 이미 '${existingKeyFile.lang}.lang.json'파일에 있어요.`;
          return;
        }

        const krFile = readLangFiles(langPath).find(
          (file) => file.lang === "kr"
        );
        const vnFile = readLangFiles(langPath).find(
          (file) => file.lang === "vn"
        );
        const enFile = readLangFiles(langPath).find(
          (file) => file.lang === "en"
        );
        const jaFile = readLangFiles(langPath).find(
          (file) => file.lang === "ja"
        );

        if (!krFile) {
          console.error(`File 'kr.lang.json' not found`);
          errorMessage = `'kr.lang.json'파일을 찾을 수 없어요.`;
          return;
        } else if (!vnFile) {
          console.error(`File 'vn.lang.json' not found`);
          errorMessage = `'vn.lang.json'파일을 찾을 수 없어요.`;
          return;
        } else if (!enFile) {
          console.error(`File 'en.lang.json' not found`);
          errorMessage = `'en.lang.json'파일을 찾을 수 없어요.`;
          return;
        } else if (!jaFile) {
          console.error(`File 'ja.lang.json' not found`);
          errorMessage = `'ja.lang.json'파일을 찾을 수 없어요.`;
          return;
        }

        if (errorMessage) {
          return res.status(400).json({ message: errorMessage });
        }

        if (krFile) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          krFile.data[key] = translations.ko;
          const krFilePath = path.join(langPath, "kr.lang.json");
          fs.writeFileSync(krFilePath, JSON.stringify(krFile.data, null, 2));
        } else {
          console.error(`File 'kr.lang.json' not found`);
          errorMessage = `'kr.lang.json'파일을 찾을 수 없어요.`;
          return;
        }

        if (vnFile) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          vnFile.data[key] = translations.vi;
          const vnFilePath = path.join(langPath, "vn.lang.json");
          fs.writeFileSync(vnFilePath, JSON.stringify(vnFile.data, null, 2));
        } else {
          console.error(`File 'vn.lang.json' not found`);
          errorMessage = `'vn.lang.json'파일을 찾을 수 없어요.'`;
          return;
        }

        for (const langFile of readLangFiles(langPath)) {
          if (langFile.lang !== "kr" && langFile.lang !== "vn") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            langFile.data[key] = translations[langFile.lang];
            const filePath = path.join(langPath, `${langFile.lang}.lang.json`);
            fs.writeFileSync(filePath, JSON.stringify(langFile.data, null, 2));
          }
        }
      }

      updateLangFiles(langPath, key, translations);
      message = `모든 언어 파일에 키와 값을 추가했어요.`;

      if (errorMessage) {
        return res.status(500).json({ message: errorMessage });
      }

      return res.status(200).json({ message });
    } catch (error) {
      console.error("!@#!#@:", error);
      return res.status(500).json({
        message: `잘못된 경로: '${langPath}'경로에 *.lang.json 파일이 존재하지 않아요.`,
      });
    }
  } else {
    return res.status(405).json({ message: "올바른 요청이 아니에요." });
  }
}
