export type Message = string;

type ValidationValue = boolean | number | string | RegExp;

export type ValidateResult<
  TValidationValue extends ValidationValue = ValidationValue
> = {
  isError: boolean;
  errorMessage: Message;
  validateInput: (value: TValidationValue) => boolean;
};

export type SingleValidator<
  ValidationRule extends ValidationValue = ValidationValue
> = (message?: Message) => ValidateResult<ValidationRule>;

export type MultipleValidateReulst = {
  isError: boolean;
  validators: SingleValidator[];
  validateInput: (value: ValidationValue) => boolean;
};

export type MultipleValidator = (
  ...validators: ValidateResult<any>[]
) => MultipleValidateReulst;
