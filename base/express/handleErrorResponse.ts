import { MessageConstants } from "../constants";
import alreadyExistsResponse from "./response/alreadyExistsResponse";
import badRequestResponse from "./response/badRequestResponse";
import invalidCredentialsResponse from "./response/invalidCredentialsResponse";
import recordNotFoundResponse from "./response/recordNotFoundResponse";

interface ErrorResponseOptions {
  notFoundResponseString?: string;
  invalidCredentialsResponseString?: string;
}

export default function handleErrorResponse(
  dataFromError: any,
  errorOptions: ErrorResponseOptions = {}
) {
  // it may be a string or undefined, thhat's why !dataFromError is needed
  if (typeof dataFromError !== "string" || !dataFromError) {
    return null;
  }

  const { notFoundResponseString, invalidCredentialsResponseString } =
    errorOptions;

  switch (dataFromError) {
    case MessageConstants.RECORD_ALREADY_EXISTS:
      return alreadyExistsResponse();
    case MessageConstants.RECORD_NOT_FOUND:
      return recordNotFoundResponse(notFoundResponseString ?? "");
    case MessageConstants.INVALID_CREDENTIALS:
      return invalidCredentialsResponse(invalidCredentialsResponseString ?? "");
    case undefined:
      return badRequestResponse("Something went wrong");
    default:
      return null;
  }
}
