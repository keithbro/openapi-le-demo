import * as utils from "../../utils/src/router";
import { ExpressRequest } from "../../utils/src/types";
import { operations } from "./server";
import { apiSchema } from "./schema";

interface Response<O extends keyof operations> {
  send: (response: operations[O]["responses"]) => void;
}

export interface Handler<O extends keyof operations> {
  (
    req: ExpressRequest<
      operations[O]["parameters"]["path"],
      operations[O]["responses"]["schema"],
      operations[O]["parameters"]["body"]["payload"],
      operations[O]["parameters"]["query"]
    >,
    res: Response<O>
  ): void;
}

export const initialize = () => {
  const { router, server } = utils.initialize();

  const registerEndpoint = <O extends keyof operations>(
    operationId: O,
    handler: Handler<O>
  ) => utils.registerEndpoint(router, apiSchema, operationId, handler);

  return { registerEndpoint, router, server };
};

export { errorHandler } from "../../utils/src/router";
