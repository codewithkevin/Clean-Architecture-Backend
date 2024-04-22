import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import BillModel, { BillInput, BillDocument } from "../models/bill.model";
import BudgetModel from "../../budget/models/budget.model";

interface BillQueryParams {
  page: number;
  limit: number;
  query: FilterQuery<BillDocument>;
}

export async function createBill(input: Omit<BillInput, "budget">) {
  return await BillModel.create(input);
}

export async function getBills({
  page = 1,
  limit = 10,
  query,
}: BillQueryParams) {
  return await BillModel.find(query, {}, { limit, skip: (page - 1) * limit });
}

export async function findAndUpdateBill(
  query: FilterQuery<BillDocument>,
  update: UpdateQuery<BillDocument>,
  options: QueryOptions
) {
  return BillModel.findOneAndUpdate(query, update, options);
}

export async function removeBill(query: FilterQuery<BillDocument>) {
  return BillModel.deleteOne(query);
}

export async function findBill(
  query: FilterQuery<BillDocument>,
  options: QueryOptions = { lean: true }
) {
  return await BillModel.findOne(query, {}, options);
}

export async function payBill(userId: string, billId: string) {
  const bill = await BillModel.findById(billId);
  if (!bill) throw new Error("Bill not found");
  if (bill.user.toString() !== userId.toString())
    throw new Error("Unauthorized");

  const budget = await BudgetModel.findById(bill.budget);
  if (!budget) throw new Error("Budget not found");

  if (budget.budget < bill.amount) {
    throw new Error("Insufficient budget");
  }

  // Deduct the amount from the budget
  budget.budget -= bill.amount;
  await budget.save();

  // Mark the bill as paid
  bill.paid = true;
  await bill.save();

  return { message: "Bill paid successfully", budget: budget };
}
