import { Router } from "express";

const router = Router();

router.post("/sign-up", (req, res) => {
  res.send("Sign up");
});

export { router };
