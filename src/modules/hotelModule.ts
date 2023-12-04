import { Router } from "express";
import successResponse from "../../base/express/response/successResponse";
import { CreateHotelDto } from "../../src/dto/hotel/create-hotel.dto";
import badRequestResponse from "../../base/express/response/badRequestResponse";
import { createHotel, getHotels } from "../../databaseLogic/hotel";
import authorizeAdmin from "../../base/utils/jwt/authorizeAdmin";
import classValidator from "../../base/validator/classValidator";
import handleErrorResponse from "../../base/express/handleErrorResponse";
import getPaginationFromQuery from "../../base/express/request/getPagination";
import getFilter from "../../base/express/request/getFilter";

const router = Router();

router.get("/", async (req, res) => {
  const pagination = getPaginationFromQuery(req.query as any);
  const nameFilter = getFilter(req.query as any, "name");

  const body = await getHotels({
    ...pagination,
    where: {
      name: {
        contains: nameFilter,
      },
    },
  });

  const error = handleErrorResponse(body);

  if (error) {
    return res.send(error);
  }

  return res.send(successResponse("Hotels fetched successfully!", body));
});

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

  const error = handleErrorResponse(data);

  if (error) {
    return res.send(error);
  }

  return res.send(successResponse("Hotel created successfully!", data));
});

export { router };
