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

export interface CustomResponse {
  send: (res: RawResponse) => void;
}

export interface CustomHandler {
  (req: Request<any, any, any, any>, res: CustomResponse): void;
}

export { Request as ExpressRequest } from "express";
export { RouterAbstraction as LeRouter } from "@luxuryescapes/router";
