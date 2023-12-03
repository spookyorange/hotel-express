import { NextFunction, Response } from "express";
import ExtendedRequest from "../../express/extendedRequest";
import { UserPayload } from "../userPayload";
import unauthorizedResponse from "../../express/response/unauthorizedResponse";
import forbiddenResponse from "../../express/response/forbiddenResponse";

export default function authorizeAdmin(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.send(unauthorizedResponse());
  }

  const user = req.user as UserPayload;

  if (!user.admin) {
    return res.send(forbiddenResponse());
  }

  next();
}
