import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { serverStatusRouter } from "./routes/serverStatusRoute";
import { NotFoundError, errorHandler } from "@centerity-assignment/common";
const app = express();
app.use(json());
app.use(serverStatusRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
