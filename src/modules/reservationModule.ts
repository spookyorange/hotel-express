import { Router } from "express";
import successResponse from "../../base/express/response/successResponse";
import badRequestResponse from "../../base/express/response/badRequestResponse";
import classValidator from "../../base/validator/classValidator";
import handleErrorResponse from "../../base/express/handleErrorResponse";
import { CreateReservationDto } from "../dto/reservation/create-reservation.dto";
import ExtendedRequest from "../../base/express/extendedRequest";
import {
  createReservation,
  getReservations,
  updateReservationById,
} from "../../databaseLogic/reservation";
import getPaginationFromQuery from "../../base/express/request/getPagination";
import authorizeAdmin from "../../base/utils/jwt/authorizeAdmin";

const router = Router();

router.get("/", async (req: ExtendedRequest, res) => {
  const userId = req.user?.id;

  const pagination = getPaginationFromQuery(req.query as any);

  if (!userId) {
    return res.send(badRequestResponse("Something went terribly wrong!"));
  }

  const data = await getReservations({
    ...pagination,
    where: {
      reservationCreatorId: userId,
    },
  });

  return res.send(successResponse("Reservations fetched successfully!", data));
});

router.get("/admin", authorizeAdmin, async (req: ExtendedRequest, res) => {
  const pagination = getPaginationFromQuery(req.query as any);
  const verified = req.query.verified as string;

  let whereVerified: boolean | undefined;

  if (verified === "true") {
    whereVerified = true;
  } else if (verified === "false") {
    whereVerified = false;
  }

  const data = await getReservations({
    ...pagination,
    where: {
      verified: whereVerified,
    },
  });

  return res.send(successResponse("Reservations fetched successfully!", data));
});

router.post(
  "/:id/verify",
  authorizeAdmin,
  async (req: ExtendedRequest, res) => {
    const { id } = req.params;

    if (!id) {
      return res.send(badRequestResponse("Something went terribly wrong!"));
    }

    const data = await updateReservationById(Number(id), {
      verified: true,
    });

    const error = handleErrorResponse(data);

    if (error) {
      return res.send(error);
    }

    return res.send(
      successResponse("Reservation verified successfully!", data)
    );
  }
);

router.post(
  "/:id/unverify/",
  authorizeAdmin,
  async (req: ExtendedRequest, res) => {
    const { id } = req.params;

    if (!id) {
      return res.send(badRequestResponse("Something went terribly wrong!"));
    }

    const data = await updateReservationById(Number(id), {
      verified: false,
    });

    const error = handleErrorResponse(data);

    if (error) {
      return res.send(error);
    }

    return res.send(
      successResponse("Reservation verified successfully!", data)
    );
  }
);

router.post("/", async (req: ExtendedRequest, res) => {
  const body: CreateReservationDto = req.body;

  if (!req.user?.id) {
    return res.send(badRequestResponse("Something went terribly wrong!"));
  }

  body.userId = req.user?.id;

  try {
    classValidator<CreateReservationDto>(body, {
      presence: ["hotelId", "checkInDate", "checkOutDate"],
      isNumber: ["hotelId"],
      isDate: ["checkInDate", "checkOutDate"],
    });

    body.guests.forEach((guest) => {
      classValidator(guest, {
        presence: ["firstName", "lastName", "email", "phoneNumber"],
        isString: ["firstName", "lastName", "email", "phoneNumber"],
      });
    });
  } catch (error: any) {
    return res.send(badRequestResponse(error.message));
  }

  body.checkInDate = new Date(body.checkInDate);
  body.checkOutDate = new Date(body.checkOutDate);

  const data = await createReservation(body);

  const error = handleErrorResponse(data);

  if (error) {
    return res.send(error);
  }

  return res.send(successResponse("Reservation created successfully!", data));
});

export { router };
