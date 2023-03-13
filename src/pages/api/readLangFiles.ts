import { type NextApiRequest, type NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import {
  type ReadLangFilesParamsType,
  type ReadLangFIlesReturnType,
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
  res: NextApiResponse<ReadLangFIlesReturnType>
) {
  if (req.method === "GET") {
    const { langPath } = req.query as ReadLangFilesParamsType;

    let errorMessage = "";
    let message = "";

    const requiredFields = ["langPath"];
    for (const field of requiredFields) {
      if (!req.query[field]) {
        errorMessage = `필수 필드 '${field}'가 누락되었어요.`;
        break;
      }
    }

    if (errorMessage) {
      return res.status(500).json({ message: errorMessage });
    }

    const filePath2 = path.join(process.cwd(), langPath);

    try {
      // const files = fs.readdirSync(langPath);
      const files = fs.readdirSync(filePath2);
      /**
       * 주어진 경로에서 존재하는 모든 언어 파일을 가져옵니다.
       */
      function readLangFiles(langPath: string): LangFile[] {
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

      // const langFiles = readLangFiles(langPath);
      const langFiles = readLangFiles(filePath2);

      if (langFiles.length === 0) {
        // errorMessage = `잘못된 경로: '${langPath}'경로에 *.lang.json 파일이 존재하지 않아요.`;
        errorMessage = `cwd: ${process.cwd()}, filePath2: ${filePath2}`;
      } else {
        message = `성공적으로 '${langPath}' 경로에서 ${files.length}개의 언어 파일을 가져왔어요.}`;
      }

      if (errorMessage) {
        return res.status(500).json({ message: errorMessage });
      }

      return res.status(200).json({ message });
    } catch (error) {
      return res.status(500).json({
        // message: `잘못된 경로: '${langPath}'경로에 *.lang.json 파일이 존재하지 않아요.`,
        message: `cwd: ${process.cwd()}, filePath2: ${filePath2}`,
      });
    }
  } else {
    return res.status(405).json({ message: "올바른 요청이 아니에요." });
  }
}
