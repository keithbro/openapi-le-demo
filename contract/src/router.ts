import {
  router as buildRouter,
  errorHandler,
  RouterAbstraction,
} from "@luxuryescapes/router";
import express from "express";
import { apiSchema } from "./schema";
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
  const operationSchema = apiSchema[operationId];

  router[operationSchema.method]({
    url: operationSchema.url,
    schema: operationSchema.validationSchema,
    handlers: [handler],
  });
};

export { server, router, errorHandler, register };
