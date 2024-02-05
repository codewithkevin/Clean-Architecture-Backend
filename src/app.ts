import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const port = config.get("port") as number;

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.listen(port, () => {
  logger.info(`Server is running on port http://localhost:${port}`);
  connect();
  routes(app);
});
