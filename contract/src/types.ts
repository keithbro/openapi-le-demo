import { RequestHandler } from "express";
import { operations } from "./server";

export type Handler<
  O extends keyof operations,
  T = operations[O]["responses"]["schema"]
> = RequestHandler<any, T>;
