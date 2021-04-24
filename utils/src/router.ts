import express, { RequestHandler, Response } from "express";
import {
  router as buildLeRouter,
  RouterAbstraction,
} from "@luxuryescapes/router";
import { ApiSchema, CustomHandler, RawResponse } from "./types";

export const buildRouter = (server = express()) => {
  server.use(express.json());

  const router = buildLeRouter(server, {
    validateResponses: true,
    swaggerBaseProperties: {
      swagger: "2.0",
      info: {
        description: "This is my api",
        version: "1.0.0",
        title: "My api",
        termsOfService: null,
        contact: { email: "hi@hi.com" },
      },
      host: "https://myapi.com",
      basePath: "/",
      tags: [],
      consumes: ["application/json"],
      produces: ["application/json"],
      schemes: ["https"],
      paths: {},
      securityDefinitions: {},
      definitions: {},
    },
  });

  return { router, server };
};

export const convertResponse = (expressRes: Response) => {
  return {
    send: (r: RawResponse) => {
      expressRes.status(r.status);
      expressRes.json(r.schema);
    },
  };
};

export const register = <S extends ApiSchema>(
  router: RouterAbstraction,
  apiSchema: S,
  operationId: keyof S,
  handler: CustomHandler
) => {
  const operationSchema = apiSchema[operationId];

  const expressHandler: RequestHandler = (expressReq, expressRes) => {
    const res = convertResponse(expressRes);

    handler(expressReq, res);
  };

  router[operationSchema.method]({
    url: operationSchema.url,
    schema: operationSchema.validationSchema,
    handlers: [expressHandler],
  });
};

export { errorHandler } from "@luxuryescapes/router";
