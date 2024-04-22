/** @format */

import config from "config";
import express from "express";
import { createConnection } from "typeorm";
import logger from "./utils/logger";
import connectDB from "./utils/connectDB";
import deserializeUser from "./middleware/deserializeUser";
import routes from "./routes";

const port = config.get("port") as number;

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.listen(port, () => {
  logger.info(`Server is running on port http://localhost:${port}`);
  connectDB();
  routes(app);
});
