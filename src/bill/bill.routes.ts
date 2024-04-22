import { Router } from "express";
import {
  createBillHandler,
  getBillsHandler,
  updateBillHandler,
  deleteBillHandler,
} from "./controller/bill.controller";
import validateResource from "../middleware/validateResource";
import {
  createBillSchema,
  getBillSchema,
  deleteBillSchema,
  // updateBillSchema,
} from "./schema/bill.schema";

const router = Router();

router.post("/", validateResource(createBillSchema), createBillHandler);

router.get("/", validateResource(getBillSchema), getBillsHandler);

router.put("/:billId", updateBillHandler);

router.delete(
  "/:billId",
  validateResource(deleteBillSchema),
  deleteBillHandler
);

export default router;
