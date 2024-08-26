import "dotenv/config";
import { MiddlewareFn } from "type-graphql";
import jwt, { JwtPayload } from "jsonwebtoken";

import { MyContext } from "types/Interfaces";

const APP_SECRET = process.env.SESSION_SECRET as string;

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  try {
    const token = authorization?.replace("Bearer ", "")!;
    const user = jwt.verify(token, APP_SECRET) as JwtPayload;
    context.res.locals.userId = user.id;
    return next();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};
