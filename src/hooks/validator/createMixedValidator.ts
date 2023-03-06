import { type Validator } from "./useValidator";

type ValidatorHook<T> = () => Validator<T>;

/**
 * 전달 받은 Validator를 결합하여 하나의 혼합된 Validator를 생성합니다.
 * @param validators Validator
 */
export const createMixedValidator =
  <T>(...validators: ValidatorHook<T>[]) =>
  () => {
    const { isError: isValidatorError, validateInput: validateValidator } =
      validators.reduce(
        (acc, validator) => {
          const { isError: prevError, validateInput: prevValidate } = acc;
          const { isError, validateInput } = validator();
          return {
            isError: prevError || isError,
            validateInput: (value: T) =>
              prevValidate(value) && validateInput(value),
          };
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        { isError: false, validateInput: (value: T) => true }
      );

    const validateMixedInput = (value: T) => {
      return validateValidator(value);
    };

    return { isError: isValidatorError, validateInput: validateMixedInput };
  };
