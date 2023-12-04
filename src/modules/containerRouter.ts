import { Router } from "express";
import { router as userRouter } from "./userModule";
import { router as hotelRouter } from "./hotelModule";
import { router as reservationRouter } from "./reservationModule";

const router = Router();

router.use("/user", userRouter);
router.use("/hotel", hotelRouter);
router.use("/reservation", reservationRouter);

export { router };
