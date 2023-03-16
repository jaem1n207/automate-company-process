import { type SingleValidator } from "@/models/validator";
import { regex } from "@/utils/regex";
import { useCallback, useState } from "react";

export const useOnlySpecialCharactersValidator: SingleValidator<string> = (
  message
) => {
  const [isError, setIsError] = useState<boolean>(false);

  const validateInput = useCallback((value: string) => {
    const isValid = regex.onlySpecialCharacters.test(value.trim());
    setIsError(isValid);
    return isValid;
  }, []);

  return {
    errorMessage: message ?? "특수문자만으로 이루어질 수 없어요.",
    isError,
    validateInput,
  };
};
