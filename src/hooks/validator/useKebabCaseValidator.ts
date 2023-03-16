import { type SingleValidator } from "@/models/validator";
import { regex } from "@/utils/regex";
import { useCallback, useState } from "react";

export const useKebabCaseValidator: SingleValidator<string> = (message) => {
  const [isError, setIsError] = useState<boolean>(false);

  const validateInput = useCallback((value: string) => {
    const isValid = regex.kebakCase.test(value.trim());
    setIsError(!isValid);
    return isValid;
  }, []);

  return {
    errorMessage: message ?? "kebab-case로 입력해주세요.",
    isError,
    validateInput,
  };
};

// import { type Validator, useValidator } from "./useValidator";

// /**
//  * 문자열 값이 kebab-case인지 검사하는 커스텀 훅
//  */
// export const useKebabCaseValidator = (): Validator<string> => {
//   const isKebabCase = (value: string) => {
//     return regex.kebakCase.test(value);
//   };

//   return useValidator<string>(isKebabCase);
// };
