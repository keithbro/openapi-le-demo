import swaggerToTS from "openapi-typescript";
import { writeFileSync } from "fs";
import { buildRouter } from "./router";
import { ApiSchema } from "./types";

export const generate = (apiSchema: ApiSchema) => {
  const { router } = buildRouter();

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
};
