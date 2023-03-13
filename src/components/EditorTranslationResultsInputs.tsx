import { type Translations } from "@/models/language";
import React, { useEffect, useState } from "react";
import EditableInput from "./EditableInput";

interface EditorTranslationResultsInputsProps {
  initialValues: Translations;
}

const EditorTranslationResultsInputs = ({
  initialValues,
}: EditorTranslationResultsInputsProps) => {
  const [translations, setTranslations] = useState<Translations>(initialValues);

  useEffect(() => {
    setTranslations(initialValues);
  }, [initialValues]);

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto max-w-lg">
        <h3 className="mb-4 text-2xl font-bold">번역 결과 확인</h3>
        {Object.entries(translations).map(([label, value]) => (
          <div key={label} className="mt-1">
            <EditableInput
              isCopyable
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
      </div>
    </div>
  );
};

export default EditorTranslationResultsInputs;
