import swaggerToTS from "openapi-typescript";
import { writeFileSync } from "fs";
import { schema } from "./schema";
import { router } from "./router";

schema.forEach((s) => {
  router[s.method]({
    url: s.url,
    handlers: [],
    schema: s.schema,
    operationId: s.operationId,
  });
});

// @ts-expect-error
const input = router.toSwagger();

console.log(JSON.stringify(input, null, 2));

const output = swaggerToTS(input);
// console.log(output);
writeFileSync("./src/server.ts", output);
