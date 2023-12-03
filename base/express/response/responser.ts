import { Response } from "express";

export default function responser(
  res: Response,
  statusCode: number,
  message: string,
  data?: any
) {
  res.send({
    statusCode,
    message,
    data,
  });
}
