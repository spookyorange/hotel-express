import { NextFunction, Response } from "express";
import ExtendedRequest from "../../express/extendedRequest";
import jwt from "jsonwebtoken";
import getEnv from "../getEnv";
import unauthorizedResponse from "../../express/response/unauthorizedResponse";
import forbiddenResponse from "../../express/response/forbiddenResponse";

export default function authenticateToken(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (token == null) {
    return unauthorizedResponse(res);
  }

  jwt.verify(
    token,
    getEnv<string>("TOKEN_SECRET", "secret"),
    (err: any, user: any) => {
      console.log(err);

      if (err) {
        return forbiddenResponse(res);
      }

      req.user = user;

      next();
    }
  );
}
