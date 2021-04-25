import * as utils from "../../utils/src/router";
import { ExpressRequest } from "../../utils/src/types";
import { operations } from "./server";
import { apiSchema } from "./schema";

interface Response<O extends keyof operations> {
  send: <
    StatusCode extends keyof operations[O]["responses"],
    StatusCodeResponse = operations[O]["responses"][StatusCode]
  >(
    code: StatusCode,
    resBody: StatusCodeResponse extends { schema: any }
      ? StatusCodeResponse["schema"]
      : never
  ) => void;
}

type ResBody<
  O extends keyof operations,
  Response = operations[O]["responses"],
  StatusCodeResponse = Response[keyof Response]
> = StatusCodeResponse extends { schema: any }
  ? StatusCodeResponse["schema"]
  : never;

export interface Handler<O extends keyof operations> {
  (
    req: ExpressRequest<
      operations[O]["parameters"]["path"],
      ResBody<O>,
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
