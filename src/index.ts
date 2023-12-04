import express from "express";
import { router as containerRouter } from "./modules/containerRouter";
import authenticateToken from "../base/utils/jwt/authenticateToken";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(authenticateToken);

app.get("/", (req, res) => {
  console.log("Hello World!");
  res.send("Hello World!");
});

app.use(containerRouter);

app.listen(port, () => {
  console.log(`App started successfully on ${port}`);
});

export { app };

app.on("error", (error) => {
  console.log(error);
});
