import { type Translations } from "@/models/language";
import { isEmptryString } from "@/utils/assertions";
import React, { type FormEvent, useEffect, useState, useCallback } from "react";
import { type Id } from "react-toastify";
import LoadingButton from "./common/LoadingButton";
import EditableInput from "./EditableInput";

interface TranslationResultsInputsProps {
  initialValues: Translations;
  onSubmit: (translations: Translations) => Promise<Id>;
  isDisabled: boolean;
}

const TranslationResultsInputs = ({
  initialValues,
  isDisabled,
  onSubmit,
}: TranslationResultsInputsProps) => {
  const [translations, setTranslations] = useState<Translations>(initialValues);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await onSubmit(translations);
    },
    [translations, onSubmit]
  );

  useEffect(() => {
    setTranslations(initialValues);
  }, [initialValues]);

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto max-w-lg">
        <h3 className="mb-4 text-2xl font-bold">번역 결과 확인</h3>
        <form onSubmit={(e) => void handleSubmit(e)}>
          {Object.entries(translations).map(([label, value]) => (
            <div key={label} className="mt-1">
              <EditableInput
                label={label}
                value={value}
                onChange={(value) => {
                  setTranslations((prevTranslations) => ({
                    ...prevTranslations,
                    [label]: value,
                  }));
                }}
              />
            </div>
          ))}
          <div className="mt-4">
            <LoadingButton
              type="submit"
              isLoading={false}
              disabled={
                isDisabled ||
                Object.values(translations).some((value) =>
                  isEmptryString(value)
                ) ||
                Object.keys(translations).length === 0
              }
            >
              각 언어별 json 파일에 저장
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TranslationResultsInputs;
