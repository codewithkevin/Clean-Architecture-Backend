import { object, number, string, TypeOf, z } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    budget: number({
      required_error: "Budget is required",
    }),
  }),
};

const params = {
  params: object({
    budgetId: string({
      required_error: "BudgetId is required",
    }),
  }),
};

const query = {
  query: object({
    page: number().optional(),
    limit: number().optional(),
    ...payload.body.partial().shape,
  }),
};

export const createBudgetSchema = object({
  ...payload,
});

export const updateBudgetSchema = object({
  ...payload.body.partial().shape,
  ...params,
});

export const getBudgetSchema = object({
  ...query,
});

export const deleteBudgetSchema = object({
  params: z.object({
    budgetId: z.string(),
  }),
});

export type CreateBudgetInput = TypeOf<typeof createBudgetSchema>;
export type UpdateBudgetInput = TypeOf<typeof updateBudgetSchema>;
export type GetBudgetInput = TypeOf<typeof getBudgetSchema>;
export type DeleteBudgetInput = TypeOf<typeof deleteBudgetSchema>;
