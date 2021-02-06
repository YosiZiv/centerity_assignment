// mock api call for test
export const api = {
  getServerStatus: jest.fn().mockImplementation(
    () =>
      new Promise((resolve) =>
        resolve({
          data: {
            priority: counter(),
            status: "Online",
          },
        })
      )
  ),
  setServerStatus: jest
    .fn()
    .mockImplementation(
      (status) =>
        new Promise((resolve) =>
          resolve({ data: { priority: counter(), status } })
        )
    ),
};
// simple reset every 8 rounds use for mock test functions
const counterFunction = () => {
  let counter = 1;
  return () => {
    if (counter > 8) {
      counter = 1;
      return counter;
    }
    return counter++;
  };
};
const counter = counterFunction();
