import { Router } from "express";

const router = Router();

router.get("/x", (req, res) => {
  res.send("Hello World!");
});

export { router };
