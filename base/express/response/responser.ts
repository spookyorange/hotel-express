import { Response } from "express";

export default function responser(
  res: Response,
  statusCode: number,
  message: string,
  data?: any
) {
  res.status(statusCode);
  res.send({
    statusCode,
    message,
    data,
  });
}
