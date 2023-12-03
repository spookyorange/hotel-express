import jwt from "jsonwebtoken";
import getEnv from "../getEnv";
import { getUserById } from "../../../databaseLogic/user";
import { User } from "@prisma/client";

export default async function generateAccessToken(id: number) {
  return getUserById(id).then((user) => {
    if (!user) {
      return null;
    }

    const { id, username, email, admin } = user as User;

    return jwt.sign(
      { id, username, email, admin },
      getEnv<string>("TOKEN_SECRET", "secret"),
      {
        expiresIn: getEnv<string>("JWT_EXPIRES_IN", "1800s"),
      }
    );
  });
}
