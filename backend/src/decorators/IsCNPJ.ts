import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';

function validaCNPJ(cnpj: string) {
    cnpj = cnpj.replace(/\D+/g, '');

    if (cnpj.length != 14)
        return false

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
        return false

    let length = cnpj.length - 2
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let position = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += Number(numbers.charAt(length - i)) * position--;
        if (position < 2)
            position = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== Number(digits.charAt(0)))
        return false

    length += 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    position = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += Number(numbers.charAt(length - i)) * position--;
        if (position < 2)
            position = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;

    return result === Number(digits.charAt(1))
}

@ValidatorConstraint({ async: false })
class IsCNPJConstraint implements ValidatorConstraintInterface {
    validate(cnpj: string, args: ValidationArguments) {
        const isValid = validaCNPJ(cnpj);
        if (!isValid) {
            args.constraints[0] = 'O CNPJ fornecido é inválido.';
        }
        return isValid;
    }

    defaultMessage(args: ValidationArguments) {
        return args.constraints[0];
    }
}

export function IsCNPJ(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCNPJConstraint,
        });
    };
}