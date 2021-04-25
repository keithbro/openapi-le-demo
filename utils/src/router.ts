import express, {
  RequestHandler as ExpressRequestHandler,
  Response as ExpressResponse,
} from "express";
import {
  router as buildLeRouter,
  RouterAbstraction,
} from "@luxuryescapes/router";
import { ApiSchema, Handler, RawResponse, Response } from "./types";

export const initialize = (server = express()) => {
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
      host: "myapi.com",
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

export const convertResponse = (expressRes: ExpressResponse) => {
  return {
    send: (status: number, json: any) => {
      expressRes.status(status);
      expressRes.json(json);
    },
  };
};

export const registerEndpoint = <S extends ApiSchema>(
  router: RouterAbstraction,
  apiSchema: S,
  operationId: keyof S,
  handler: Handler
) => {
  const operationSchema = apiSchema[operationId];

  const expressHandler: ExpressRequestHandler = (expressReq, expressRes) => {
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
