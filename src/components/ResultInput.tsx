import { type KeyboardEvent, memo, type ChangeEvent } from "react";
import {
  PencilIcon,
  ArrowDownOnSquareStackIcon,
} from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { type LanguageLabel } from "@/models/language";

interface ResultInputProps {
  label: LanguageLabel;
  value: string;
  editable: boolean;
  onChange: (label: LanguageLabel, value: string) => void;
  onSave: (label: LanguageLabel) => void;
  onEdit: (label: LanguageLabel) => void;
}

const ResultInput = memo(
  ({ label, value, editable, onChange, onSave, onEdit }: ResultInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(label, e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSave(label);
      }
    };

    const handleSaveClick = () => {
      onSave(label);
    };

    const handleEditClick = () => {
      onEdit(label);
    };

    return (
      <div className="relative mb-4">
        <label htmlFor={label} className="mb-1 block font-medium text-gray-700">
          {label}
        </label>
        <div className="relative rounded-lg border border-gray-300 bg-white">
          <input
            id={label}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`${
              editable
                ? "border-blue-500 focus:border-blue-500 focus:ring-blue-500"
                : ""
            } focus:shadow-outline-blue block w-full appearance-none rounded-lg bg-transparent py-2 px-3 leading-tight focus:z-10 focus:border-blue-500 focus:outline-none`}
            disabled={!editable}
          />
          {!editable && (
            <div className="absolute top-0 left-0 h-full w-full cursor-not-allowed rounded-lg bg-gray-100 opacity-50"></div>
          )}
          {!editable && (
            <button
              type="button"
              onClick={handleEditClick}
              className="absolute top-0 right-0 px-3 py-2 text-gray-500"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          )}
          {editable && (
            <Transition
              show={editable}
              enter="transition ease-in-out duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in-out duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <button
                type="button"
                onClick={handleSaveClick}
                className="absolute top-0 right-0 px-3 py-2 text-blue-500"
              >
                <ArrowDownOnSquareStackIcon className="h-5 w-5" />
              </button>
            </Transition>
          )}
        </div>
      </div>
    );
  }
);

ResultInput.displayName = "ResultInput";

export default ResultInput;
