import { type SingleValidator } from "@/models/validator";
import { regex } from "@/utils/regex";
import { useState, useCallback } from "react";

export const useCamelCaseValidator: SingleValidator<string> = (message) => {
  const [isError, setIsError] = useState<boolean>(false);

  const validateInput = useCallback((value: string) => {
    const isValid = regex.camelCase.test(value.trim());
    setIsError(!isValid);
    return isValid;
  }, []);

  return {
    errorMessage: message ?? "camelCase로 입력해주세요.",
    isError,
    validateInput,
  };
};
