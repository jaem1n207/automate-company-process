import { useCallback, useState, memo } from "react";
import {
  PencilIcon,
  ArrowDownOnSquareStackIcon,
  XMarkIcon,
  ClipboardIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { useFocus } from "@/hooks/useFocus";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface EditableInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isCopyable?: boolean;
}

const EditableInput = memo(
  ({ label, value, onChange, isCopyable }: EditableInputProps) => {
    const { inputRef, setIsFocused } = useFocus<HTMLInputElement>();

    const [copied, setCopied] = useState(false);
    const [copyValue, copy] = useCopyToClipboard();
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState("");

    const handleCopy = async () => {
      if (inputRef.current) {
        await copy(inputRef.current.value);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
      }
    };

    const handleEditClick = useCallback(() => {
      setIsEditing(true);
      setNewValue(value);
      setIsFocused(true);
    }, [setIsFocused, value]);

    const handleSaveClick = useCallback(() => {
      setIsEditing(false);
      onChange(newValue);
    }, [newValue, onChange]);

    const handleCancelClick = useCallback(() => {
      setIsEditing(false);
      setNewValue("");
    }, []);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          handleSaveClick();
        } else if (e.key === "Escape") {
          handleCancelClick();
        }
      },
      [handleSaveClick, handleCancelClick]
    );

    const hasCopyButtonEditablePositionStyles: string = isCopyable
      ? "right-12"
      : "right-0";

    return (
      <div className="relative mb-4">
        <label htmlFor={label} className="mb-1 block font-medium text-gray-700">
          {label}
        </label>
        <div className="relative rounded-lg border border-gray-300 bg-white">
          <input
            ref={inputRef}
            id={label}
            type="text"
            value={isEditing ? newValue : value}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${
              isEditing
                ? "border-blue-500 focus:border-blue-500 focus:ring-blue-500"
                : ""
            } focus:shadow-outline-blue block w-full appearance-none rounded-lg bg-transparent py-2 px-3 leading-tight focus:z-10 focus:border-blue-500 focus:outline-none`}
            readOnly={!isEditing}
            disabled={!isEditing}
          />
          {!isEditing && (
            <div
              className={`absolute top-0 left-0 ${hasCopyButtonEditablePositionStyles} h-full w-full cursor-not-allowed rounded-lg bg-gray-100 opacity-50`}
            ></div>
          )}
          <div
            className={`absolute inset-y-0 ${hasCopyButtonEditablePositionStyles} flex items-center`}
          >
            {isEditing ? (
              <Transition
                show={isEditing}
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
                  className="px-2 py-2 text-blue-500 hover:text-blue-700"
                >
                  <ArrowDownOnSquareStackIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="px-2 py-2 text-gray-500 hover:text-gray-700"
                  onClick={handleCancelClick}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </Transition>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="absolute top-0 right-0 px-3 py-2 text-gray-500"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
          {isCopyable && (
            <button
              onClick={() => void handleCopy()}
              className="absolute top-0 right-0 rounded-r-md border-l border-gray-300 bg-white px-3 py-2 text-gray-400 hover:text-gray-500 focus:border-blue-300 focus:outline-none focus:ring"
            >
              {copyValue && copied ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <ClipboardIcon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
);

EditableInput.displayName = "EditableInput";

export default EditableInput;
