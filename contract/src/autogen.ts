import * as utils from "../../utils/src/router";
import { ExpressRequest, LeRouter } from "../../utils/src/types";
import { operations } from "./server";
import { apiSchema } from "./schema";

interface CustomResponse<O extends keyof operations> {
  send: (response: operations[O]["responses"]) => void;
}

export interface CustomHandler<O extends keyof operations> {
  (
    req: ExpressRequest<
      operations[O]["parameters"]["path"],
      operations[O]["responses"]["schema"],
      operations[O]["parameters"]["body"]["payload"],
      operations[O]["parameters"]["query"]
    >,
    res: CustomResponse<O>
  ): void;
}

export const initialize = () => {
  const { router, server } = utils.initialize();

  const register = <O extends keyof operations>(
    operationId: O,
    handler: CustomHandler<O>
  ) => utils.register(router, apiSchema, operationId, handler);

  return { register, router, server };
};
