import { regex } from "@/utils/regex";
import { type Validator, useValidator } from "./useValidator";

/**
 * 문자열 값이 kebab-case인지 검사하는 커스텀 훅
 */
export const useKebabCaseValidator = (): Validator<string> => {
  const isKebabCase = (value: string) => {
    return regex.kebakCase.test(value);
  };

  return useValidator<string>(isKebabCase);
};
