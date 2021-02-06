import { NodeModule } from "./index";
import { api } from "./api";

const client = new NodeModule();

it("its should return a Promise Resolve with lower priority service", async () => {
  const response = await client.getPriorityServer();
  expect(api.getServerStatus).toHaveBeenCalledTimes(8);
  expect(response).toEqual({
    status: "fulfilled",
    value: { data: { priority: 1, status: "Online" } },
  });
});

it("its should reject a promise if no service available", async () => {
  jest
    .spyOn(api, "getServerStatus")
    .mockImplementationOnce(
      () => new Promise((resolve, reject) => reject("error get server"))
    );
  try {
    await client.getPriorityServer();
  } catch (err) {
    expect(api.getServerStatus).toHaveBeenCalledTimes(8);
    expect(err).toEqual({ error: "No Available servers founds" });
  }
});

it("its should return a Promise with array length 8 if success update all services", async () => {
  const response = await client.setServersStatus();
  expect(api.setServerStatus).toHaveBeenCalledTimes(8);
  expect(response).toHaveLength(8);
});

it("its should reject with error message if not all services status update success", async () => {
  jest
    .spyOn(api, "setServerStatus")
    .mockImplementationOnce(
      () => new Promise((resolve, reject) => reject("error set server"))
    );
  try {
    await client.setServersStatus();
  } catch (err) {
    expect(api.setServerStatus).toHaveBeenCalledTimes(8);
    expect(err).toEqual({ error: "couldn't set some services status" });
  }
});
