/** @format */

import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get("privateKey") as string;
const publicKey = config.get("publicKey") as string;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
    // expiresIn: "1h",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    console.log("Error New ", error);
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
