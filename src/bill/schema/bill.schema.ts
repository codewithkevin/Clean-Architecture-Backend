import { object, number, string, TypeOf, z } from "zod";

const payload = {
  body: object({
    // budgetId: string({
    //   required_error: "Budget Id is required",
    // }),
    description: string({
      required_error: "description is required",
    }),
    amount: number({
      required_error: "amount is required",
    }),
  }),
};

const params = {
  params: object({
    billId: string({
      required_error: "BillId is required",
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

export const createBillSchema = object({
  ...payload,
});

export const updateBillSchema = object({
  ...payload.body.partial().shape,
  ...params,
});

export const getBillSchema = object({
  ...query,
});

export const deleteBillSchema = object({
  params: z.object({
    billId: z.string(),
  }),
});

export type CreateBillInput = TypeOf<typeof createBillSchema>;
export type UpdateBillInput = TypeOf<typeof updateBillSchema>;
export type GetBillInput = TypeOf<typeof getBillSchema>;
export type DeleteBillInput = TypeOf<typeof deleteBillSchema>;
