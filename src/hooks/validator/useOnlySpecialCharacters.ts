import { regex } from "@/utils/regex";
import { useCallback, useState } from "react";

export const useOnlySpecialCharactersValidator = (errorMessage?: string) => {
  const [isError, setIsError] = useState<boolean>(false);

  const validateInput = useCallback((value: string) => {
    const isValid = regex.onlySpecialCharacters.test(value.trim());
    setIsError(isValid);
    return isValid;
  }, []);

  return {
    name: "onlySpecialCharacters",
    errorMessage: errorMessage ?? "특수문자만으로 이루어질 수 없어요.",
    isError,
    validateInput,
  };
};
