import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const ComparePassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get("password");
  const confirmPassword = control.get("confirmPassword");

  return password?.value != confirmPassword?.value
    ? { passwordMismatch: true }
    : null;
};
