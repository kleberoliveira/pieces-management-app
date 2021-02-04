import axios from "axios";

export default async ({ url, method, body }) => {
  return axios({
    baseURL: process.env.APP_API_URL,
    url: `/${url}`,
    method,
    data: body,
    auth:{
      username: process.env.APP_USER,
      password: process.env.APP_PASS,
    },
  }).catch((error) => error);
};
