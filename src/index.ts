import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log("Hello World!");
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App started successfully on ${port}`);
});
