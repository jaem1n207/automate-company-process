import { type ValidateReturn, type ValidationValue } from "@/models/validator";
import { useMemo, useState } from "react";

export const useCreateMixedValidator = <T extends ValidationValue>(
  ...validators: ValidateReturn<T>[]
) => {
  const [isError, setIsError] = useState<boolean>(false);

  /**
   * 전달 받은 validators를 순회하며 하나라도 error가 발생하면 isError를 true로 변경합니다.
   */
  const validateInput = (value: T) => {
    validators.forEach((validator) => {
      validator.validateInput(value);
    });

    const isValid = validators.reduce(
      (acc, validator) => acc && !validator.isError,
      true
    );
    setIsError(!isValid);

    return true;
  };

  /**
   * validators를 순회하며 isError가 true인 validator를 찾아서 반환합니다.
   */
  const validatorList = useMemo(
    () => validators.filter((validator) => validator.isError),
    [validators]
  );

  return {
    isError,
    validateInput,
    validators: validatorList,
  };
};

// import { type Validator } from "./useValidator";

// type ValidatorHook<T> = () => Validator<T>;

// /**
//  * 전달 받은 Validator를 결합하여 하나의 혼합된 Validator를 생성합니다.
//  * @param validators Validator
//  */
// export const createMixedValidator =
//   <T>(...validators: ValidatorHook<T>[]) =>
//   () => {
//     const { isError: isValidatorError, validateInput: validateValidator } =
//       validators.reduce(
//         (acc, validator) => {
//           const { isError: prevError, validateInput: prevValidate } = acc;
//           const { isError, validateInput } = validator();
//           return {
//             isError: prevError || isError,
//             validateInput: (value: T) =>
//               prevValidate(value) && validateInput(value),
//           };
//         },
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         { isError: false, validateInput: (value: T) => true }
//       );

//     const validateMixedInput = (value: T) => {
//       return validateValidator(value);
//     };

//     return { isError: isValidatorError, validateInput: validateMixedInput };
//   };
