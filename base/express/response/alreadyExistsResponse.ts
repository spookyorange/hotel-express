import { Response } from "express";
import responser from "./responser";

export default function alreadyExistsResponse(res: Response) {
  responser(res, 400, `A record with same unique attribute already exists`);
}
