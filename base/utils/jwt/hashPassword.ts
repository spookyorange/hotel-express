import bcrypt from "bcrypt";
import getEnv from "../getEnv";

export default function hashPassword(password: string) {
  const hashedPassword = bcrypt.hashSync(
    password,
    Number(getEnv<number>("SALT_ROUNDS", 10))
  );

  return hashedPassword;
}
