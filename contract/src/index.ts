import { router as buildRouter, errorHandler } from "@luxuryescapes/router";
import express from "express";
import swaggerToTS from "openapi-typescript";
import { writeFileSync } from "fs";
import { schema } from "./schema";

const server = express();

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

schema.forEach((s) => {
  console.log({ s });
  router[s.method]({ url: s.url, handlers: [], schema: s.schema });
});

// @ts-expect-error
const input = router.toSwagger();

console.log(JSON.stringify(input, null, 2));

const output = swaggerToTS(input);
console.log(output);
writeFileSync("./src/server.ts", output);
