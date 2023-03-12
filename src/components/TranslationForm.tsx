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
import ErrorLabelList from "./common/ErrorLabelList";
import axios, { type AxiosResponse } from "axios";
import {
  type KeyExistsInLangFilesParamsType,
  type KeyExistsInLangFilesReturnType,
  type UpdateLangFilesBodyType,
  type UpdateLangFilesReturnType,
} from "@/models/api";

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
  const textCombinedValidator = useCreateMixedValidator(useRequiredValidator());
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

  const handleTranslateClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fileKeyCombinedValidator.isError) return;
    if (textCombinedValidator.isError) return;

    try {
      const params: KeyExistsInLangFilesParamsType = {
        langPath,
        key: fileKey,
      };

      const { data } = await axios.get<KeyExistsInLangFilesReturnType>(
        "/api/keyExistsInLangFiles",
        {
          params,
        }
      );

      toast.success(data.message, {
        autoClose: 1000,
      });

      await translateText(text);
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
          const { data } =
            response as AxiosResponse<KeyExistsInLangFilesReturnType>;
          return toast.error(data.message, {
            autoClose: 1000,
          });
        }
      }

      return toast.error("번역을 실행하는데 실패했어요. :(");
    }
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

  const handleSubmitTranslationResults = async (translations: Translations) => {
    const body: UpdateLangFilesBodyType = {
      langPath,
      key: fileKey,
      translations,
    };

    try {
      const { data }: AxiosResponse<UpdateLangFilesReturnType> =
        await axios.post("/api/updateLangFiles", body);
      return toast.success(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
          const { data } = response as AxiosResponse<UpdateLangFilesReturnType>;
          return toast.error(data.message);
        }
      }

      return toast.error("번역 결과를 저장하는데 실패했어요. :(");
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => void handleTranslateClick(e)}
        className="mx-auto max-w-lg"
      >
        <div className="mb-4">
          <label htmlFor="key" className="mb-1 block font-medium text-gray-700">
            Key to Add
          </label>
          <input
            autoComplete="off"
            type="text"
            id="key"
            name="key"
            value={fileKey}
            onChange={handleFileKeyChange}
            required
            className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorLabelList validators={fileKeyCombinedValidator.validators} />
        </div>

        <div className="mb-4">
          <label
            htmlFor="value"
            className="mb-1 block font-medium text-gray-700"
          >
            Value to Add
          </label>
          <input
            autoComplete="off"
            type="text"
            id="value"
            name="value"
            value={text}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorLabelList validators={textCombinedValidator.validators} />
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
          onSubmit={handleSubmitTranslationResults}
          initialValues={translations}
          isDisabled={
            isEmptryString(fileKey) ||
            isEmptryString(text) ||
            textCombinedValidator.isError ||
            fileKeyCombinedValidator.isError
          }
        />
      )}
    </div>
  );
};

export default TranslationForm;
