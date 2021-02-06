import { api } from "./api";

export class NodeModule {
  private serverList = [
    "http://localhost:1010",
    "http://localhost:1020",
    "http://localhost:1030",
    "http://localhost:1040",
    "http://localhost:1050",
    "http://localhost:1060",
    "http://localhost:1070",
    "http://localhost:1080",
  ];

  async getPriorityServer() {
    return new Promise(async (resolve, reject) => {
      try {
        // set parallel request array
        const promises: any = [];
        this.serverList.forEach((srv) =>
          promises.push(api.getServerStatus(srv))
        );
        // Promise allSettled useful in this case since we want to handle both reject and resolved promise
        const responses = await Promise.allSettled(promises);
        // unfortunately i could make typescript understand we get back array in any case, so this extra check needed
        const availableServers = Array.isArray(responses)
          ? // filter out all server not available from reject
            responses.filter((response) => response.status !== "rejected")
          : [];

        return availableServers.length
          ? resolve(
              // sort the element on the array and return the first one
              availableServers.sort(
                (a, b) => a.value.data.priority - b.value.data.priority
              )[0]
            )
          : // availableServers is empty reject request
            reject({ error: "No Available servers founds" });
        // TBH this catch block should be reach but for extra safe i keep at
      } catch (err) {
        console.log(err);
        reject({ error: "No Available servers founds" });
      }
    });
  }
  async setServersStatus() {
    return new Promise(async (resolve, reject) => {
      try {
        // set parallel request array
        const promises: any = [];
        this.serverList.forEach((srv) =>
          promises.push(
            api.setServerStatus(
              srv,
              //  Randomly sign server Online or Offline this string structure need for backend otherwise request well reject
              Math.random() >= 0.5 ? "Online" : "Offline"
            )
          )
        );
        // Promise all resolve if all promises resolves
        const responses = await Promise.all(promises);
        resolve(responses);
      } catch (err) {
        // If some services couldn't be set notify message to the user
        // Could be better by loop the responses and tracking witch promise reject
        // i make this simple this time because i wasn't sure if this extra step is needed
        reject({ error: "couldn't set some services status" });
      }
    });
  }
}
// create client from the NodeModule
const client = new NodeModule();

(async () => {
  try {
    await client.setServersStatus();
    const {
      value: { data },
    }: any = await client.getPriorityServer();
    // print the return server
    console.log(data);
  } catch (err) {
    console.log(err);
  }
})();
