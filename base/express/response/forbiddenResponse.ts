import { Response } from "express";
import responser from "./responser";

export default function forbiddenResponse(res: Response) {
  return responser(res, 403, "Forbidden");
}
