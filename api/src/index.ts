import { server, router, errorHandler } from "../../contract/src/router";
import { Handler } from "../../contract/src/types";
import { schema } from "../../contract/src/schema";

const x: Handler<"/api/something/{id}/put"> = (req, res) => {
  const { id } = req.params; // not actually a number
  const { hello, world } = req.query;
  const { action } = req.body;

  console.log({ id, hello, world, action });

  res.json({ id: 2, error: "hello" });
};

router.put({
  url: "/api/something/:id",
  schema: schema[0].schema,
  handlers: [x],
});
server.use(errorHandler);

server.listen(3000, () => console.log("Listening..."));
