import { Service, OpenAPI } from "../../contract/src/client";

OpenAPI.BASE = "http://localhost:3000";

const doStuff = async () => {
  const res = await Service.updateSomething(23, "world", "cup", {
    action: "update",
  });

  console.log({ res });
};

doStuff();
