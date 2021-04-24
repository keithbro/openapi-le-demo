// @ts-expect-error
import * as s from "strummer";

export const apiSchema = {
  updateSomething: {
    url: "/api/something/:id",
    method: "put" as const,
    validationSchema: {
      request: {
        query: s.objectWithOnly({
          hello: s.string(),
          world: s.string({ min: 2, max: 4 }),
        }),
        params: s.objectWithOnly({ id: s.integer({ parse: true }) }),
        body: s.objectWithOnly({
          action: s.enum({
            values: ["create", "update", "delete"],
            verbose: true,
          }),
        }),
      },
      responses: {
        201: s.objectWithOnly({ id: s.integer() }),
        400: s.objectWithOnly({ error: s.string() }),
      },
    },
  },
};
