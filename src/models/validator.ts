type Message = string;

export type ValidationValue = boolean | string | RegExp;

export type ValidateReturn<
  TValidationValue extends ValidationValue = ValidationValue
> = {
  isError: boolean;
  errorMessage: Message;
  validateInput: (value: TValidationValue) => boolean;
};

export type SingleValidator<
  ValidationRule extends ValidationValue = ValidationValue
> = (message?: Message) => ValidateReturn<ValidationRule>;
