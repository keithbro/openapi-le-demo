import { buildRouter, errorHandler } from "../../utils/src/router";
import { CustomHandler, register } from "../../contract/src/autogen";

const { router, server } = buildRouter();

const handler: CustomHandler<"updateSomething"> = (req, res) => {
  const { id } = req.params; // not actually a number
  const { hello, world } = req.query;
  const { action } = req.body;

  console.log({ id, hello, world, action });

  res.send({ status: 201, schema: { id: 2 } });
};

register(router, "updateSomething", handler);

server.use(errorHandler);

server.listen(3000, () => console.log("Listening..."));
