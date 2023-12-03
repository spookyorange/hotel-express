import { Router } from "express";
import successResponse from "../../base/express/response/successResponse";
import { SignUpDto } from "../../src/dto/user/sign-up.dto";
import { SignInDto } from "../../src/dto/user/sign-in.dto";
import { signUp, signIn } from "../../databaseLogic/user";
import alreadyExistsResponse from "../../base/express/response/alreadyExistsResponse";
import { MessageConstants } from "../../base/constants";
import invalidCredentialsResponse from "../../base/express/response/invalidCredentialsResponse";

const router = Router();

router.post("/sign-up", async (req, res) => {
  const body: SignUpDto = req.body;

  const data = await signUp(body);

  if (data === MessageConstants.RECORD_ALREADY_EXISTS) {
    return res.send(alreadyExistsResponse());
  }

  return res.send(successResponse("User signed up successfully!", data));
});

router.post("/sign-in", async (req, res) => {
  const body: SignInDto = req.body;

  const data = await signIn(body);

  if (data === MessageConstants.RECORD_NOT_FOUND) {
    return res.send(invalidCredentialsResponse("Username not found"));
  }

  if (data === MessageConstants.INVALID_CREDENTIALS) {
    return res.send(
      invalidCredentialsResponse("Username or password is incorrect")
    );
  }

  return res.send(successResponse("User signed in successfully!", data));
});

export { router };
