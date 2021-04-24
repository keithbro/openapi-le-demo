import { Handler, initialize, errorHandler } from "../../contract/src/autogen";

const { registerEndpoint, server } = initialize();

const handler: Handler<"updateSomething"> = (req, res) => {
  const { id } = req.params; // not actually a number
  const { hello, world } = req.query;
  const { action } = req.body;

  console.log({ id, hello, world, action });

  res.send({ status: 201, schema: { id: 2 } });
};

registerEndpoint("updateSomething", handler);

server.use(errorHandler);

server.listen(3000, () => console.log("Listening..."));
