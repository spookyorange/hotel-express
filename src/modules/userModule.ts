import { Router } from "express";
import successResponse from "../../base/express/response/successResponse";
import { SignUpDto } from "../../src/dto/user/sign-up.dto";
import { SignInDto } from "../../src/dto/user/sign-in.dto";
import { signUp, signIn } from "../../databaseLogic/user";
import classValidator from "../../base/validator/classValidator";
import badRequestResponse from "../../base/express/response/badRequestResponse";
import handleErrorResponse from "../../base/express/handleErrorResponse";

const router = Router();

router.post("/sign-up", async (req, res) => {
  const body: SignUpDto = req.body;

  try {
    classValidator<SignUpDto>(body, {
      presence: ["email", "username", "password"],
      isString: ["email", "username", "password"],
    });
  } catch (error: any) {
    return res.send(badRequestResponse(error.message));
  }

  const data = await signUp(body);

  const error = handleErrorResponse(data);

  if (error) {
    return res.send(error);
  }

  return res.send(successResponse("User signed up successfully!", data));
});

router.post("/sign-in", async (req, res) => {
  const body: SignInDto = req.body;

  try {
    classValidator<SignInDto>(body, {
      presence: ["username", "password"],
      isString: ["username", "password"],
    });
  } catch (error: any) {
    return res.send(badRequestResponse(error.message));
  }

  const data = await signIn(body);

  const error = handleErrorResponse(data, {
    notFoundResponseString: "Username not found",
    invalidCredentialsResponseString: "Invalid credentials",
  });

  if (error) {
    return res.send(error);
  }

  return res.send(successResponse("User signed in successfully!", data));
});

export { router };
