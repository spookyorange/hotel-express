import prismaClient from "../clients/prismaClient";
import hashPassword from "../base/utils/jwt/hashPassword";
import generateAccessToken from "../base/utils/jwt/generateAccessToken";
import { SignUpDto } from "../src/dto/user/sign-up.dto";
import handleError from "../base/express/handleError";

export async function signUp(dto: SignUpDto) {
  try {
    const { email, username, password } = dto;

    const hashedPassword = hashPassword(password);

    const createdUser = await prismaClient.user.create({
      data: {
        email,
        username,
        hashedPassword,
      },
    });

    const accessToken = generateAccessToken(createdUser.id);

    return { accessToken };
  } catch (error: any) {
    return handleError(error);
  }
}
