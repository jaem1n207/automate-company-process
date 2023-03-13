import React, { useEffect, useState } from "react";

import { type Translations } from "@/models/language";
import EditableInput from "./EditableInput";
import AnimatedContainer from "./AnimatedContainer";

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
        <AnimatedContainer>
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
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default EditorTranslationResultsInputs;
