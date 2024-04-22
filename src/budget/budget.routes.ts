import { Router } from "express";
import {
  createBudgetHandler,
  getBudgetsHandler,
  updateBudgetHandler,
  deleteBudgetHandler,
} from "./controller/budget.controller";
import validateResource from "../middleware/validateResource";
import {
  createBudgetSchema,
  getBudgetSchema,
  deleteBudgetSchema,
  // updateBudgetSchema,
} from "./schema/budget.schema";

const router = Router();

router.post("/", validateResource(createBudgetSchema), createBudgetHandler);

router.get("/", validateResource(getBudgetSchema), getBudgetsHandler);

router.put("/:budgetId", updateBudgetHandler);

router.delete(
  "/:budgetId",
  validateResource(deleteBudgetSchema),
  deleteBudgetHandler
);

export default router;
