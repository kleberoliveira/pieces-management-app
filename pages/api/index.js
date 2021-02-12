import axios from "axios";

export default async ({ url, method, body }) => {
  return axios({
    baseURL: 'http://localhost:3000',
    url: `/${url}`,
    method,
    data: body,
    auth:{
      username: 'teste',
      password: 'teste',
    },
  }).catch((error) => error);
};
