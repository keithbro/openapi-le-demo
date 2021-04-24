import { CustomHandler, initialize } from "../../contract/src/autogen";

const { register, server } = initialize();

const handler: CustomHandler<"updateSomething"> = (req, res) => {
  const { id } = req.params; // not actually a number
  const { hello, world } = req.query;
  const { action } = req.body;

  console.log({ id, hello, world, action });

  res.send({ status: 201, schema: { id: 2 } });
};

register("updateSomething", handler);

server.listen(3000, () => console.log("Listening..."));
