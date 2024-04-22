/** @format */

import { Request, Response } from "express";
import logger from "../../utils/logger";
import {
  createUser,
  getUsers,
  findUser,
  findAndUpdateUser,
  deleteUser,
} from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    console.log(user);
    return res.send(omit(user, "password"));
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUsersHandler(
  req: Request,
  res: Response
): Promise<void> {
  const page = req.query.page ? parseInt(req.query.page.toString(), 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit.toString(), 10) : 10;

  const queryFields = ["name", "email"];

  const query: any = {};
  queryFields.forEach((field) => {
    const value = (req.query as any)[field];
    if (value) {
      query[field] = value;
    }
  });

  const users = await getUsers({ page, limit, query });

  return res.send(users);
}

export async function updateUserHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const updates = req.body;

  console.log("updates ", updates);

  const user = await findUser({ _id: userId });

  console.log("user Id ", user);

  if (!user) return res.sendStatus(404);

  const updateUser = await findAndUpdateUser({ _id: userId }, updates, {
    new: true,
  });

  return res.send(updateUser);
}

export async function deleteUserHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const user = await findUser({ _id: userId });

  if (!user) return res.sendStatus(404);

  await deleteUser({ _id: userId });

  return res.sendStatus(200);
}
