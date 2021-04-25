import { RouteSchema } from "@luxuryescapes/router";
import { Request } from "express";

export type ApiSchema = Record<
  string,
  {
    method: "put";
    url: string;
    validationSchema: RouteSchema;
  }
>;

export interface RawResponse {
  status: number;
  schema: any;
}

export interface Response {
  send: (code: any, resBody: Record<string, any>) => void;
}

export interface Handler {
  (req: Request<any, any, any, any>, res: Response): void;
}

export { Request as ExpressRequest } from "express";
export { RouterAbstraction as LeRouter } from "@luxuryescapes/router";
