// @ts-expect-error
import * as s from "strummer";

export const schema = [
  {
    url: "x",
    method: "put" as const,
    schema: {
      request: {
        query: s.objectWithOnly({
          hello: s.string(),
          world: s.string({ min: 2, max: 4 }),
        }),
        params: s.objectWithOnly({ id: s.integer({ parse: true }) }),
        body: s.objectWithOnly({
          action: s.enum({ values: ["create", "update"], verbose: true }),
        }),
      },
      responses: {
        201: s.objectWithOnly({ id: s.integer() }),
      },
    },
  },
];
