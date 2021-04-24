import { router as buildRouter, errorHandler } from "@luxuryescapes/router";
import express from "express";

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

export { server, router, errorHandler };
