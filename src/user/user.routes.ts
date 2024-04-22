/** @format */

import { Router } from "express";
import {
  createUserHandler,
  getUsersHandler,
  updateUserHandler,
  deleteUserHandler,
} from "./controller/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema, getUserSchema } from "./schema/user.schema";
import requireUser from "../middleware/requireUser";

const router = Router();

router.post("/", validateResource(createUserSchema), createUserHandler);

router.get("/", requireUser, getUsersHandler);

router.put("/", requireUser, updateUserHandler);

router.delete("/", requireUser, deleteUserHandler);

export default router;
