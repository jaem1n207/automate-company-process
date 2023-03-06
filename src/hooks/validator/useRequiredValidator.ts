import { type Validator, useValidator } from "./useValidator";

/**
 * 값이 null, undefined 이거나 비어 있지 않은지 확인하는 유효성 검사 함수를 반환하는 훅
 */
export const useRequiredValidator = <T>(): Validator<T> => {
  const isRequired = (value: T): boolean => {
    return (
      value !== null && value !== undefined && value.toString().trim() !== ""
    );
  };

  return useValidator(isRequired);
};
