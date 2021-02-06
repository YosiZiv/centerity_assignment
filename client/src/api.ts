import Axios from "axios";
// set timeout request for 5 seconds
const axios = Axios.create({ timeout: 5000 });
export const api = {
  getServerStatus: (url: string) => axios.get(url),
  setServerStatus: (url: string, status: string) => axios.post(url, { status }),
};
