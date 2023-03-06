import { useState } from "react";

export type Validator<T> = {
  isError: boolean;
  validateInput: (value: T) => boolean;
};

/**
 * 유효성 검사 함수를 사용하는 일반적인 커스텀 훅
 * @param validateFn 유효성 검사 함수
 * @returns isError: 에러 여부, validateInput: 값이 유효한지 여부를 반환하는 함수
 */
export const useValidator = <T>(
  validateFn: (value: T) => boolean
): Validator<T> => {
  const [isError, setIsError] = useState(false);

  const validateInput = (value: T): boolean => {
    const isValid = validateFn(value);
    setIsError(value !== null && !isValid);
    return isValid;
  };

  return { isError, validateInput };
};
