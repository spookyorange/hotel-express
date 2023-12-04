import { ValidateOptions } from "./types/validateOptions";

function isIsoDate(date: string) {
  if (date.length > 10 || date.length < 10) {
    return false;
  }

  const dateTimestamp = Date.parse(date);
  if (dateTimestamp > 2147483648000 || dateTimestamp < -2147483648000) {
    return false;
  }

  return true;
}

export default function classValidator<T extends Object>(
  dto: T,
  validatables: ValidateOptions
): string | null {
  const dtoKeys = Object.keys(dto);

  if (validatables.presence) {
    validatables.presence.forEach((key) => {
      if (!dtoKeys.includes(key)) {
        throw new Error(`Property ${key} is required`);
      }
    });
  }

  if (validatables.isString) {
    validatables.isString.forEach((key) => {
      if (typeof dto[key as keyof T] !== "string") {
        throw new Error(`Property ${key} must be a string`);
      }
    });
  }

  if (validatables.isNumber) {
    validatables.isNumber.forEach((key) => {
      if (typeof dto[key as keyof T] !== "number") {
        throw new Error(`Property ${key} must be a number`);
      }
    });
  }

  if (validatables.isBoolean) {
    validatables.isBoolean.forEach((key) => {
      if (typeof dto[key as keyof T] !== "boolean") {
        throw new Error(`Property ${key} must be a boolean`);
      }
    });
  }

  if (validatables.isDate) {
    validatables.isDate.forEach((key) => {
      if (!isIsoDate(dto[key as keyof T] as string)) {
        throw new Error(`Property ${key} must be a valid ISO date`);
      }
    });
  }

  return null;
}
