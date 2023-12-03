import { Response } from "express";
import responser from "./responser";

export default function successResponse(
  res: Response,
  message: string,
  data?: any
) {
  return responser(res, 200, message, data);
}
