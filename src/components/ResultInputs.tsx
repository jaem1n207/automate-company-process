import { type LanguageLabel } from "@/models/language";
import { useState } from "react";
import ResultInput from "./ResultInput";

type InputValues = {
  [key in LanguageLabel]: string;
};

const initialValues: InputValues = {
  kr: "한국어",
  en: "English",
  jp: "日本語",
  vn: "Tiếng Việt",
};

const ResultInputs = () => {
  const [values, setValues] = useState<InputValues>(initialValues);
  const [editable, setEditable] = useState<{ [key in LanguageLabel]: boolean }>(
    {
      kr: false,
      en: false,
      jp: false,
      vn: false,
    }
  );

  const handleInputChange = (label: LanguageLabel, value: string) => {
    setValues({ ...values, [label]: value });
  };

  const handleSave = (label: LanguageLabel) => {
    setEditable({ ...editable, [label]: false });
  };

  const handleEdit = (label: LanguageLabel) => {
    setEditable({ ...editable, [label]: true });
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">번역 결과</h1>
      {Object.entries(values).map(([label, value]) => (
        <ResultInput
          key={label}
          label={label as LanguageLabel}
          value={value}
          editable={editable[label as LanguageLabel]}
          onChange={handleInputChange}
          onSave={handleSave}
          onEdit={handleEdit}
        />
      ))}
    </>
  );
};

export default ResultInputs;
