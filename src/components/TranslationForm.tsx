import { useMemo, useState } from "react";

import { type Translations } from "@/models/language";
import { useTranslate } from "@/hooks/useTranslation";
import TranslationResultsInputs from "./TranslationResultsInputs";
import { hasEmptyOrUndefinedProperty } from "@/utils/object";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "react-toastify";

import { LOCAL_STORAGE_KEYS } from "@/enum";
import LoadingButton from "./common/LoadingButton";
import { isEmptryString } from "@/utils/assertions";
import { useCreateMixedValidator } from "@/hooks/validator/createMixedValidator";
import { useKebabCaseValidator, useRequiredValidator } from "@/hooks/validator";

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
  const fileKeyCombinedValidator = useCreateMixedValidator(
    useRequiredValidator(),
    useKebabCaseValidator()
  );
  console.log(
    "🚀 ~ file: TranslationForm.tsx:39 ~ TranslationForm ~ fileKeyCombinedValidator:",
    fileKeyCombinedValidator
  );
  const textCombinedValidator = useCreateMixedValidator(
    useRequiredValidator(),
    useKebabCaseValidator()
  );
  const { ko, en, ja, vi, isLoading, translateText } = useTranslate();
  const [langPath] = useLocalStorage<string>(LOCAL_STORAGE_KEYS.LANG_PATH, "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    textCombinedValidator.validateInput(value);
    setText(value);
  };

  const handleFileKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    fileKeyCombinedValidator.validateInput(value);
    setFileKey(value);
  };

  const handleTranslateClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fileKeyCombinedValidator.isError) return;
    if (textCombinedValidator.isError) return;

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
          <ul>
            {fileKeyCombinedValidator.validators.map(
              (validator) =>
                validator.isError && (
                  <li key={validator.name}>{validator.errorMessage}</li>
                )
            )}
          </ul>
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
          <ul>
            {textCombinedValidator.validators.map(
              (validator) =>
                validator.isError && (
                  <li key={validator.name}>{validator.errorMessage}</li>
                )
            )}
          </ul>
        </div>
        <div className="mb-4">
          <LoadingButton
            type="submit"
            isLoading={isLoading}
            disabled={
              isEmptryString(fileKey) ||
              isEmptryString(text) ||
              textCombinedValidator.isError ||
              fileKeyCombinedValidator.isError
            }
          >
            번역 실행
          </LoadingButton>
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
