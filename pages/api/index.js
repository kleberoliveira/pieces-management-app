import axios from 'axios'
export default async ({ url, method, body, bearer }) => {
    return axios({
        url: `${process.env.API_HOST}/${url}`,
        method,
        data: body,
        headers: bearer
            ? {
                  Authorization: `Bearer ${bearer}`,
              }
            : {},
    }).catch((error) => error)
}
