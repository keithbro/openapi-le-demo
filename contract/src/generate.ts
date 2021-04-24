import swaggerToTS from "openapi-typescript";
import { writeFileSync } from "fs";
import { apiSchema } from "./schema";
import { router } from "./router";

Object.entries(apiSchema).forEach(([operationId, schema]) => {
  router[schema.method]({
    url: schema.url,
    handlers: [],
    schema: schema.validationSchema,
    operationId: operationId,
  });
});

// @ts-expect-error
const input = router.toSwagger();

console.log(JSON.stringify(input, null, 2));

const output = swaggerToTS(input);
// console.log(output);
writeFileSync("./src/server.ts", output);
