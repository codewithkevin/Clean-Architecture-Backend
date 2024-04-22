import { Request, Response } from "express";
import {
  CreateBudgetInput,
  UpdateBudgetInput,
  GetBudgetInput,
  DeleteBudgetInput,
} from "../schema/budget.schema";
import * as budgetService from "../service/budget.service";
import logger from "../../utils/logger";

export async function createBudgetHandler(
  req: Request<{}, {}, CreateBudgetInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const budget = await budgetService.createBudget({ ...body, user: userId });

  return res.send(budget);
}

export async function getBudgetsHandler(
  req: Request<GetBudgetInput["query"]>,
  res: Response
) {
  const page = req.query.page ? parseInt(req.query.page.toString(), 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit.toString(), 10) : 10;

  const queryFields = ["title"];

  const query: any = {};

  queryFields.forEach((field) => {
    const value = (req.query as any)[field];
    if (value) {
      query[field] = value;
    }
  });

  const budget = await budgetService.getBudgets({ page, limit, query });

  return res.send(budget);
}

export async function updateBudgetHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const budgetId = req.params.budgetId;
  const update = req.body;

  const budget = await budgetService.findBudget({ _id: budgetId });

  console.log("budget ", budget);

  if (!budget) return res.sendStatus(404);

  if (budget.user.toString() !== userId.toString()) return res.sendStatus(403);

  const updatedBudget = await budgetService.findAndUpdateBudget(
    { _id: budgetId },
    update,
    {
      new: true,
    }
  );

  console.log("UPdated Budget ", updatedBudget);

  return res.send(updatedBudget);
}

export async function deleteBudgetHandler(
  req: Request<DeleteBudgetInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const budgetId = req.params.budgetId;

  const budget = await budgetService.findBudget({ budgetId });

  if (!budget) return res.sendStatus(404);

  if (budget.user.toString() !== userId.toString()) return res.sendStatus(403);

  await budgetService.removeBudget({ budgetId });

  return res.sendStatus(200);
}
