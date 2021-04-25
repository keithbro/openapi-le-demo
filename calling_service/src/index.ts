import { Service, OpenAPI } from "../../contract/src/client";

OpenAPI.BASE = "http://localhost:3000";

const doStuff = async () => {
  const goodRes = await Service.updateSomething(23, "world", "cup", {
    action: "create",
  });

  console.log({ goodRes });

  await Service.updateSomething(23, "world", "cup", {
    action: "update",
  }).catch((reason) => {
    console.log({ reason });
  });
};

doStuff();
