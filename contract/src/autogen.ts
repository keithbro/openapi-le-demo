import { operations } from "./server";
import { Request } from "express";
import { RouterAbstraction } from "@luxuryescapes/router";
import { apiSchema } from "./schema";
import * as utils from "../../utils/src/router";

interface CustomResponse<O extends keyof operations> {
  send: (response: operations[O]["responses"]) => void;
}

export interface CustomHandler<O extends keyof operations> {
  (
    req: Request<
      operations[O]["parameters"]["path"],
      operations[O]["responses"]["schema"],
      operations[O]["parameters"]["body"]["payload"],
      operations[O]["parameters"]["query"]
    >,
    res: CustomResponse<O>
  ): void;
}

export const register = <O extends keyof operations>(
  router: RouterAbstraction,
  operationId: O,
  handler: CustomHandler<O>
) => utils.register(router, apiSchema, operationId, handler);
