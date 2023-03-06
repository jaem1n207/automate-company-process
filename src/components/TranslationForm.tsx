import { useMemo, useState } from "react";

import { type Translations } from "@/models/language";
import { useTranslate } from "@/hooks/useTranslation";
import TranslationResultsInputs from "./TranslationResultsInputs";
import { hasEmptyOrUndefinedProperty } from "@/utils/object";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "react-toastify";
import { useKebabCaseValidator } from "@/hooks/validator";
import { useRequiredValidator } from "@/hooks/validator/useRequiredValidator";
import { createMixedValidator } from "@/hooks/validator/createMixedValidator";
import { regex } from "@/utils/regex";

const useRequiredKebabCaseValidator = createMixedValidator(
  useRequiredValidator,
  useKebabCaseValidator
);

// const useRequiredKebabCaseValidator = () => {
//   const { isError: isKebabCaseError, validateInput: validateKebabCase } =
//     useKebabCaseValidator();
//   const { isError: isRequiredError, validateInput: validateRequired } =
//     useRequiredValidator<string>();

//   const validateMixedInput = (value: string): boolean => {
//     return validateRequired(value) && validateKebabCase(value);
//   };

//   return {
//     isError: isKebabCaseError || isRequiredError,
//     validateInput: validateMixedInput,
//   };
// };

const TranslationForm = () => {
  const [fileKey, setFileKey] = useState("");
  const [text, setText] = useState("");
  const { isError, validateInput } = useRequiredKebabCaseValidator();
  console.log(
    "🚀 ~ file: TranslationForm.tsx:38 ~ TranslationForm ~ isError:",
    isError,
    regex.kebakCase.test(text),
    new RegExp(/^[a-z]+(-[a-z]+)*$/).test(text)
  );
  const { ko, en, ja, vi, isLoading, translateText } = useTranslate();
  const [langPath] = useLocalStorage<string>("langPath", "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setText(value);
    validateInput(value);
  };

  const handleFileKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileKey(event.target.value);
  };

  const handleTranslateClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!langPath) {
      return toast.info("`langPath`를 먼저 설정해주세요.");
    }

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
          {isError && <div style={{ color: "red" }}>Invalid input</div>}
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
