import { useCallback, useState } from "react";

export const useRequiredValidator = (errorMessage?: string) => {
  const [isError, setIsError] = useState<boolean>(false);

  const validateInput = useCallback((value: string) => {
    const isValid = value.trim().length > 0;
    setIsError(!isValid);
    return isValid;
  }, []);

  return {
    name: "required",
    errorMessage: errorMessage ?? "Input is required",
    isError,
    validateInput,
  };
};

// import { type Validator, useValidator } from "./useValidator";

// /**
//  * 값이 null, undefined 이거나 비어 있지 않은지 확인하는 유효성 검사 함수를 반환하는 훅
//  */
// export const useRequiredValidator = <T>(): Validator<T> => {
//   const isRequired = (value: T): boolean => {
//     return (
//       value !== null && value !== undefined && value.toString().trim() !== ""
//     );
//   };

//   return useValidator(isRequired);
// };
