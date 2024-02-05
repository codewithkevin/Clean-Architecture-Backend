import { Request, NextFunction, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;

    next();
  }

  if (expired && typeof refreshToken === "string") {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (typeof newAccessToken === "string") {
      res.setHeader("x-access-token", newAccessToken);

      const result = verifyJwt(newAccessToken);

      res.locals.user = result.decoded;
      return next();
    } else {
      console.error("Failed to issue new access token");
      return next();
    }
  }
};

export default deserializeUser;
