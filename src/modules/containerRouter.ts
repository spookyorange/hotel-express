import { Router } from "express";
import { router as userRouter } from "./userModule";
import { router as hotelRouter } from "./hotelModule";

const router = Router();

router.use("/user", userRouter);
router.use("/hotel", hotelRouter);

export { router };
