import bcrypt from "bcrypt";

export default function comparePassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compareSync(password, hashedPassword);
}
