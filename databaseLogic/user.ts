import prismaClient from "../clients/prismaClient";
import hashPassword from "../base/utils/jwt/hashPassword";
import generateAccessToken from "../base/utils/jwt/generateAccessToken";
import { SignUpDto } from "../src/dto/user/sign-up.dto";
import handleError from "../base/express/handleError";
import { SignInDto } from "../src/dto/user/sign-in.dto";
import comparePassword from "../base/utils/jwt/comparePassword";
import { MessageConstants } from "../base/constants";

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

export async function signIn(dto: SignInDto) {
  try {
    const { username, password } = dto;

    const user = await prismaClient.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return MessageConstants.RECORD_NOT_FOUND;
    }

    const isPasswordValid = comparePassword(password, user.hashedPassword);

    if (!isPasswordValid) {
      return MessageConstants.INVALID_CREDENTIALS;
    }

    const accessToken = generateAccessToken(user.id);

    return { accessToken };
  } catch (error: any) {
    return handleError(error);
  }
}
