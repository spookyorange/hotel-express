import { Response } from "express";
import responser from "./responser";

export default function unauthorizedResponse(res: Response) {
  return responser(res, 401, "Unauthorized");
}
