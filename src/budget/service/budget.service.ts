import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import BudgetModel, {
  BudgetInput,
  BudgetDocument,
} from "../models/budget.model";

interface BudgetQueryParams {
  page: number;
  limit: number;
  query: FilterQuery<BudgetDocument>;
}

export async function createBudget(input: BudgetInput) {
  return await BudgetModel.create(input);
}

export async function getBudgets({
  page = 1,
  limit = 10,
  query,
}: BudgetQueryParams) {
  return await BudgetModel.find(query, {}, { limit, skip: (page - 1) * limit });
}

export async function findAndUpdateBudget(
  query: FilterQuery<BudgetDocument>,
  update: UpdateQuery<BudgetDocument>,
  options: QueryOptions
) {
  return BudgetModel.findOneAndUpdate(query, update, options);
}

export async function removeBudget(query: FilterQuery<BudgetDocument>) {
  return BudgetModel.deleteOne(query);
}

export async function findBudget(
  query: FilterQuery<BudgetDocument>,
  options: QueryOptions = { lean: true }
) {
  return await BudgetModel.findOne(query, {}, options);
}
