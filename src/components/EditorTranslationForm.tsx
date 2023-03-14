import { useMemo, useState } from "react";

import { type Translations } from "@/models/language";
import { useTranslate } from "@/hooks/useTranslation";
import { hasEmptyOrUndefinedProperty } from "@/utils/object";
import { toast } from "react-toastify";

import LoadingButton from "./common/LoadingButton";
import { isEmptryString } from "@/utils/assertions";
import { useCreateMixedValidator } from "@/hooks/validator/createMixedValidator";
import {
  useKebabCaseValidator,
  useOnlySpecialCharactersValidator,
  useRequiredValidator,
} from "@/hooks/validator";
import ErrorLabelList from "./common/ErrorLabelList";
import EditorTranslationResultsInputs from "./EditorTranslationResultsInputs";

const EditorTranslationForm = () => {
  const [text, setText] = useState("");
  const textCombinedValidator = useCreateMixedValidator(
    useKebabCaseValidator(),
    useOnlySpecialCharactersValidator(),
    useRequiredValidator()
  );
  const { ko, en, ja, vi, isLoading, translateText } = useTranslate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    textCombinedValidator.validateInput(value);
    setText(value);
  };

  const handleTranslateClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (textCombinedValidator.isError) return;

    try {
      await translateText(text);
    } catch (error) {
      console.error(error);

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

  const handleSubmitTranslationResults = (translations: Translations) => {
    console.log(translations);
  };

  // console.log(textCombinedValidator);

  return (
    <div>
      <form
        onSubmit={(e) => void handleTranslateClick(e)}
        className="mx-auto max-w-lg"
      >
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
            disabled={isEmptryString(text) || textCombinedValidator.isError}
          >
            번역 실행
          </LoadingButton>
        </div>
      </form>

      {isRenderResultsInputs && (
        <EditorTranslationResultsInputs initialValues={translations} />
      )}
    </div>
  );
};

export default EditorTranslationForm;
