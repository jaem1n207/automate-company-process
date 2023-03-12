import { type NextApiRequest, type NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import {
  type KeyExistsInLangFilesParamsType,
  type KeyExistsInLangFilesReturnType,
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
  res: NextApiResponse<KeyExistsInLangFilesReturnType>
) {
  if (req.method === "GET") {
    const { langPath, key } = req.query as KeyExistsInLangFilesParamsType;

    let errorMessage = "";
    let message = "";

    const requiredFields = ["langPath", "key"];
    for (const field of requiredFields) {
      if (!req.query[field]) {
        errorMessage = `필수 필드 '${field}'가 누락되었어요.`;
        break;
      }
    }

    if (errorMessage) {
      return res.status(500).json({ message: errorMessage });
    }

    try {
      /**
       * 주어진 경로에서 존재하는 모든 언어 파일을 가져옵니다.
       */
      function readLangFiles(langPath: string): LangFile[] {
        const files = fs.readdirSync(langPath);
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

      const langFile = keyExistsInLangFiles(langPath, key);
      if (langFile) {
        errorMessage = `'${key}'키는 이미 '${langFile.lang}.lang.json'파일에 있어요.`;
      } else {
        message = `'${key}'키는 사용할 수 있어요.`;
      }

      if (errorMessage) {
        return res.status(500).json({ message: errorMessage });
      }

      return res.status(200).json({ message });
    } catch (error) {
      return res.status(500).json({
        message: `잘못된 경로: '${langPath}'경로에 *.lang.json 파일이 존재하지 않아요.`,
      });
    }
  } else {
    return res.status(405).json({ message: "올바른 요청이 아니에요." });
  }
}
