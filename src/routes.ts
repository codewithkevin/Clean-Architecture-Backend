/** @format */

import { Express, Request, Response } from "express";
import sessionRoutes from "./sessions/session.routes";
import userRoutes from "./user/user.routes";
import requireUser from "./middleware/requireUser";
import billRoute from "./bill/bill.routes";
import budgetRoutes from "./budget/budget.routes";
// import * as httpStatus from "http-status

function routes(app: Express) {
  app.get("/api/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.use("/api/sessions", sessionRoutes);

  app.use("/api/user", userRoutes);

  app.use("/api/bill", billRoute);

  app.use("/api/budget", requireUser, budgetRoutes);
}

export default routes;
