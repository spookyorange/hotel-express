import { Router } from "express";
import successResponse from "../../base/express/response/successResponse";
import { SignUpDto } from "../../src/dto/user/sign-up.dto";
import { signUp } from "../../databaseLogic/user";
import alreadyExistsResponse from "../../base/express/response/alreadyExistsResponse";
import { MessageConstants } from "../../base/constants";

const router = Router();

router.post("/sign-up", async (req, res) => {
  const body: SignUpDto = req.body;

  const data = await signUp(body);

  if (data === MessageConstants.RECORD_ALREADY_EXISTS) {
    return alreadyExistsResponse(res);
  }

  return successResponse(res, "User signed up successfully!", data);
});

export { router };
