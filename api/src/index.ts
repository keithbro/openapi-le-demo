import {
  server,
  router,
  errorHandler,
  register,
} from "../../contract/src/router";
import { Handler } from "../../contract/src/types";

const handler: Handler<"updateSomething"> = (req, res) => {
  const { id } = req.params; // not actually a number
  const { hello, world } = req.query;
  const { action } = req.body;

  console.log({ id, hello, world, action });

  res.json({ id: 2, error: "hello" });
};

register(router, "updateSomething", handler);

server.use(errorHandler);

server.listen(3000, () => console.log("Listening..."));
