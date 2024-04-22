import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "../../user/model/user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface BudgetInput {
  user: UserDocument["_id"];
  title: string;
  budget: number;
}

export interface BudgetDocument extends BudgetInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const budgetSchema = new mongoose.Schema(
  {
    budgetId: {
      type: String,
      required: true,
      default: () => `budget${nanoid()}`,
      unique: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BudgetModel = mongoose.model<BudgetDocument>("budget", budgetSchema);

export default BudgetModel;
