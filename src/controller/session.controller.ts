import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utils/jwt";
import config from "config";
import { CreateUserSessionInput } from "../schema/session.schema";

export async function createUserSessionHandler(
  req: Request<{}, {}, CreateUserSessionInput["body"]>,
  res: Response
) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) return res.status(401).send("Invalid email or password provided");

  // Create the session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create an access Token
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>("accessTokenTtl"),
    }
  );

  // create a refresh Token
  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>("refreshTokenTtl"),
    }
  );

  //return access and refresh Token
  res.send({
    accessToken,
    refreshToken,
  });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({
    user: userId,
    valid: true,
  });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const session = res.locals.user.session;

  await updateSession({ id: session }, { valid: false });
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
