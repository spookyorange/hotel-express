import { Request, Response } from "express";

export default function shouldAuthMiddlewareRun(req: Request, res: Response) {
  if (req.path === "/user/sign-up" || req.path === "/user/sign-upb") {
    return false;
  }

  return true;
}
