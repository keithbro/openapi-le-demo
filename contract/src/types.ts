import { RequestHandler } from "express";
import { operations } from "./server";

export type Handler<O extends keyof operations> = RequestHandler<
  operations[O]["parameters"]["path"],
  operations[O]["responses"]["schema"],
  operations[O]["parameters"]["body"]["payload"],
  operations[O]["parameters"]["query"]
>;
