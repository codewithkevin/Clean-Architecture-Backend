import { Request, Response } from "express";
import {
  CreateBillInput,
  UpdateBillInput,
  GetBillInput,
  DeleteBillInput,
} from "../schema/bill.schema";
import * as billService from "../service/bill.service";
import logger from "../../utils/logger";

export async function createBillHandler(
  req: Request<{}, {}, CreateBillInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const bill = await billService.createBill({
    ...body,
    user: userId,
  });

  return res.send(bill);
}

export async function getBillsHandler(
  req: Request<GetBillInput["query"]>,
  res: Response
) {
  const page = req.query.page ? parseInt(req.query.page.toString(), 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit.toString(), 10) : 10;

  const queryFields = ["budget", "description", "amount", "user"];

  const query: any = {};

  queryFields.forEach((field) => {
    const value = (req.query as any)[field];
    if (value) {
      query[field] = value;
    }
  });

  const bill = await billService.getBills({ page, limit, query });

  return res.send(bill);
}

export async function updateBillHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const billId = req.params.billId;
  const update = req.body;

  const bill = await billService.findBill({ _id: billId });

  if (!bill) return res.sendStatus(404);

  if (bill.user.toString() !== userId.toString()) return res.sendStatus(403);

  const updatedBill = await billService.findAndUpdateBill(
    { _id: billId },
    update,
    {
      new: true,
    }
  );

  console.log("UPdated Bill ", updatedBill);

  return res.send(updatedBill);
}

export async function deleteBillHandler(
  req: Request<DeleteBillInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const billId = req.params.billId;

  const bill = await billService.findBill({ billId });

  if (!bill) return res.sendStatus(404);

  if (bill.user.toString() !== userId.toString()) return res.sendStatus(403);

  await billService.removeBill({ billId });

  return res.sendStatus(200);
}
