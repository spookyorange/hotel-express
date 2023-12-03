import { Router } from "express";
import { router as userRouter } from "./userModule";

const router = Router();

router.use("/user", userRouter);

export { router };
