import {
  router as buildRouter,
  errorHandler,
  RouterAbstraction,
} from "@luxuryescapes/router";
import express from "express";
import { schema } from "./schema";
import { operations } from "./server";
import { Handler } from "./types";

const server = express();
server.use(express.json());

const router = buildRouter(server, {
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

const register = <O extends keyof operations>(
  router: RouterAbstraction,
  operationId: O,
  handler: Handler<O>
) => {
  console.log(schema);
  const theSchema = schema.find((s) => s.operationId === operationId);
  if (!theSchema) throw new Error(`No schema found for ${operationId}`);

  router[theSchema.method]({
    url: theSchema.url,
    schema: theSchema.schema,
    handlers: [handler],
  });
};

export { server, router, errorHandler, register };
