import { type Translations } from "@/models/language";
import React, { type FormEvent, useEffect, useState, useCallback } from "react";
import EditableInput from "./EditableInput";

interface TranslationResultsInputsProps {
  initialValues: Translations;
  onSubmit: (value: Translations) => void;
}

const TranslationResultsInputs = ({
  initialValues,
  onSubmit,
}: TranslationResultsInputsProps) => {
  const [translations, setTranslations] = useState<Translations>(initialValues);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(translations);
    },
    [onSubmit, translations]
  );

  useEffect(() => {
    setTranslations(initialValues);
  }, [initialValues]);

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto max-w-lg">
        <h3 className="mb-4 text-2xl font-bold">번역 결과 확인</h3>
        <form onSubmit={handleSubmit}>
          {Object.entries(translations).map(([label, value]) => (
            <div key={label} className="mt-1">
              <EditableInput
                label={label}
                value={value}
                onChange={(value) => {
                  console.log(label, value);
                  setTranslations((prevTranslations) => ({
                    ...prevTranslations,
                    [label]: value,
                  }));
                }}
              />
            </div>
          ))}
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              각 언어별 json 파일에 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TranslationResultsInputs;
