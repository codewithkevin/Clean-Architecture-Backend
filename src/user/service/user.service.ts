/** @format */

import { omit } from "lodash";
import { FilterQuery } from "mongoose";
import UserModel, { UserInput, UserDocument } from "../model/user.model";

interface UserQueryParams {
  page: number;
  limit: number;
  query: FilterQuery<UserDocument>;
}

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUsers({
  page = 1,
  limit = 10,
  query,
}: UserQueryParams) {
  return await UserModel.find(query, {}, { limit, skip: (page - 1) * limit });
}

export async function findAndUpdateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  return UserModel.findOneAndUpdate(query, update, options);
}

export async function deleteUser(query: FilterQuery<UserDocument>) {
  return UserModel.deleteOne(query);
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
