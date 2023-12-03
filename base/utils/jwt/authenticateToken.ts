import { NextFunction, Response } from "express";
import ExtendedRequest from "../../express/extendedRequest";
import jwt from "jsonwebtoken";
import getEnv from "../getEnv";
import unauthorizedResponse from "../../express/response/unauthorizedResponse";
import forbiddenResponse from "../../express/response/forbiddenResponse";
import shouldAuthMiddlewareRun from "./shouldRun/shouldAuthMiddlewareRun";

export default function authenticateToken(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  if (!shouldAuthMiddlewareRun(req, res)) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (token == null) {
    return unauthorizedResponse();
  }

  jwt.verify(
    token,
    getEnv<string>("TOKEN_SECRET", "secret"),
    (err: any, user: any) => {
      console.log(err);

      if (err) {
        return forbiddenResponse();
      }

      req.user = user;

      next();
    }
  );
}
