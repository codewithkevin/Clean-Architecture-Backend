/** @format */

import { Router } from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "../middleware/requireUser";

const router = Router();

router.post(
  "/",
  validateResource(createSessionSchema),
  createUserSessionHandler
);

router.get("/", requireUser, getUserSessionsHandler);

router.delete("/", requireUser, deleteSessionHandler);

export default router;
