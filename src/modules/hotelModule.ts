import { Router } from "express";
import successResponse from "../../base/express/response/successResponse";
import { CreateHotelDto } from "../../src/dto/hotel/create-hotel.dto";
import badRequestResponse from "../../base/express/response/badRequestResponse";
import { createHotel } from "../../databaseLogic/hotel";
import authorizeAdmin from "../../base/utils/jwt/authorizeAdmin";
import classValidator from "../../base/validator/classValidator";

const router = Router();

router.post("/", authorizeAdmin, async (req, res) => {
  const body: CreateHotelDto = req.body;

  try {
    classValidator<CreateHotelDto>(body, {
      presence: ["name", "address"],
      isString: ["name", "address"],
    });
  } catch (error: any) {
    return res.send(badRequestResponse(error.message));
  }

  const data = await createHotel(body);

  if (data === undefined) {
    return res.send(badRequestResponse("Hotel could not be created"));
  }

  return res.send(successResponse("Hotel created successfully!", data));
});

export { router };
