import jwt from "jsonwebtoken";
import getEnv from "../getEnv";

export default function generateAccessToken(id: number) {
  return jwt.sign({ id }, getEnv<string>("TOKEN_SECRET", "secret"), {
    expiresIn: getEnv<string>("JWT_EXPIRES_IN", "1800s"),
  });
}
