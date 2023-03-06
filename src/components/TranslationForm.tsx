import { useEffect, useMemo, useState } from "react";

import { type Translations } from "@/models/language";
import { useTranslate } from "@/hooks/useTranslation";
import TranslationResultsInputs from "./TranslationResultsInputs";
import { hasEmptyOrUndefinedProperty } from "@/utils/object";

const TranslationForm = () => {
  const [fileKey, setFileKey] = useState("");
  const [text, setText] = useState("");
  const { ko, en, ja, vi, isLoading, translateText } = useTranslate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleFileKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileKey(event.target.value);
  };

  const handleTranslateClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    translateText(text).catch((error) => console.error(error));
  };

  const translations: Translations = useMemo(
    () => ({
      ko,
      en,
      ja,
      vi,
    }),
    [en, ja, ko, vi]
  );

  const isRenderResultsInputs = useMemo(
    () => !hasEmptyOrUndefinedProperty(translations) && !isLoading,
    [isLoading, translations]
  );

  return (
    <div>
      <form onSubmit={handleTranslateClick} className="mx-auto max-w-lg">
        <div className="mb-4">
          <label htmlFor="key" className="mb-1 block font-medium text-gray-700">
            Key to Add
          </label>
          <input
            type="text"
            id="key"
            name="key"
            value={fileKey}
            onChange={handleFileKeyChange}
            required
            className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="value"
            className="mb-1 block font-medium text-gray-700"
          >
            Value to Add
          </label>
          <input
            type="text"
            id="value"
            name="value"
            value={text}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          {!isLoading && (
            <button
              disabled={isLoading}
              type="submit"
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              번역 실행
            </button>
          )}
        </div>
      </form>

      {isRenderResultsInputs && (
        <TranslationResultsInputs
          onSubmit={(values) => console.log(values)}
          initialValues={translations}
        />
      )}
    </div>
  );
};

export default TranslationForm;
