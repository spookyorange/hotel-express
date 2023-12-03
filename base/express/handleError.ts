import { PrismaErrorCodes, MessageConstants } from "../constants";

export default function handleError(error: any) {
  if (error.code === PrismaErrorCodes.RECORD_ALREADY_EXISTS) {
    return MessageConstants.RECORD_ALREADY_EXISTS;
  }
}
