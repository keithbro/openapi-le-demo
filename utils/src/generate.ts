import generateServerTypes from "openapi-typescript";
import { generate as generateClient } from "openapi-typescript-codegen";
import { writeFileSync } from "fs";
import { initialize } from "./router";
import { ApiSchema } from "./types";

export const generate = (apiSchema: ApiSchema) => {
  const { router } = initialize();

  Object.entries(apiSchema).forEach(([operationId, schema]) => {
    router[schema.method]({
      url: schema.url,
      handlers: [],
      schema: schema.validationSchema,
      operationId: operationId,
    });
  });

  // @ts-expect-error
  const openApiSpec = router.toSwagger();

  console.log(JSON.stringify(openApiSpec, null, 2));

  const output = generateServerTypes(openApiSpec);
  // console.log(output);
  writeFileSync("./src/server.ts", output);

  generateClient({ input: openApiSpec, output: "./src/client" });
};
