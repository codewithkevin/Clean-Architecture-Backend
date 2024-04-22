/** @format */

import { Request, NextFunction, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";
import { reIssueAccessToken } from "../sessions/service/session.service";

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

  // const { decoded, expired, valid } = verifyJwt(accessToken);

  const { decoded, expired, valid } = verifyJwt(refreshToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      const result = verifyJwt(newAccessToken);
      if (result.valid && result.decoded) {
        res.locals.user = result.decoded;
        return next();
      }
    }

    console.error("Failed to issue new access token");
    res
      .status(403)
      .json({ error: "Forbidden", message: "Failed to reissue access token." });
    return; // Explicitly terminate the request-response cycle
  }

  next(); // Proceed if no conditions match
};

export default deserializeUser;
