import { ValidateOptions } from "./types/validateOptions";

export default function classValidator<T extends Object>(
  dto: T,
  validatables: ValidateOptions
): string | null {
  const dtoKeys = Object.keys(dto);

  if (validatables.presence) {
    validatables.presence.forEach((key) => {
      if (!dtoKeys.includes(key)) {
        // return `Property ${key} is required`;
        throw new Error(`Property ${key} is required`);
      }
    });
  }

  if (validatables.isString) {
    validatables.isString.forEach((key) => {
      if (typeof dto[key as keyof T] !== "string") {
        // return `Property ${key} must be a string`;
        throw new Error(`Property ${key} must be a string`);
      }
    });
  }

  if (validatables.isNumber) {
    validatables.isNumber.forEach((key) => {
      if (typeof dto[key as keyof T] !== "number") {
        // return `Property ${key} must be a number`;
        throw new Error(`Property ${key} must be a number`);
      }
    });
  }

  if (validatables.isBoolean) {
    validatables.isBoolean.forEach((key) => {
      if (typeof dto[key as keyof T] !== "boolean") {
        // return `Property ${key} must be a boolean`;
        throw new Error(`Property ${key} must be a boolean`);
      }
    });
  }

  return null;
}
