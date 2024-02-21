import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function validateCNPJ(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let cnpj = control.value;
    cnpj = cnpj.replace(/\D+/g, '');

    if (cnpj.length != 14)
      return {invalid: true};

    if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999")
      return {invalid: true};

    // Valida DVs
    let length = cnpj.length - 2
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let position = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * position--;
      if (position < 2)
        position = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(0))
      return {invalid: true};

    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    position = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * position--;
      if (position < 2)
        position = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;

    return result == digits.charAt(1) ? null : {invalid: true};
  }
}
