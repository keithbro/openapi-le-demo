import { Handler, initialize, errorHandler } from "../../contract/src/server";

const { registerEndpoint, server } = initialize();

const handler: Handler<"updateSomething"> = (req, res) => {
  const { id } = req.params; // not actually a number
  const { hello, world } = req.query;
  const { action } = req.body;

  console.log({ id, hello, world, action });

  res.send(201, { id: 42 });
  // res.send(201, { id: "42" });
  // res.send(400, { error: "Hello " });
};

registerEndpoint("updateSomething", handler);

server.use(errorHandler);

server.listen(3000, () => console.log("Listening..."));
