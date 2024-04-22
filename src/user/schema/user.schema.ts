/** @format */

import { object, string, TypeOf, number } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
};

const params = {
  params: object({
    userId: string({
      required_error: "productId is required",
    }),
  }),
};

const query = {
  query: object({
    page: number().optional(),
    limit: number().optional(),
    ...payload.body,
  }),
};

export const createUserSchema = object({
  ...payload,
});

export const updateUserSchema = object({
  ...payload,
  ...params,
});

export const getUserSchema = object({
  ...params,
  ...query,
});

export const deleteUserSchema = object({
  ...params,
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type GetUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
