import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "../../user/model/user.model";
import { BudgetDocument } from "../../budget/models/budget.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface BillInput {
  user: UserDocument["_id"];
  budget: BudgetDocument["_id"];
  description: string;
  amount: number;
}

export interface BillDocument extends BillInput, mongoose.Document {
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const billSchema = new mongoose.Schema(
  {
    billId: {
      type: String,
      required: true,
      default: () => `bill${nanoid()}`,
      unique: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    budget: { type: mongoose.Schema.Types.ObjectId, ref: "Budget" },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const BillModel = mongoose.model<BillDocument>("bill", billSchema);

export default BillModel;
