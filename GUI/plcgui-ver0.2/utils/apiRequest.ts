import { error } from "../model/apiRequestModel/error";
import { END_POINT } from "./endpoint"

type requestFlame = {
  path: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  data: string
}

export const apiRequest = async <T>(request: requestFlame): Promise<T | error> => {
  const endPoint = END_POINT + request.path;

  const apiKnock = (): Promise<T | error> =>
    fetch(endPoint, {
      method: request.method,
      mode: "cors",
      credentials: 'include',
      body: request.data,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => {
      if (!data.ok) {
        console.log(`
          URL:${endPoint}
          METHOD:${request.method}
          server error
        `);
        const missed: error = {
          type: "server",
          status: data.status
        }
        return missed
      }
      return data.json();
    })
    .catch(error => {
      console.log(`
        URL:${endPoint}
        METHOD:${request.method}
        ERROR:${error}
        通信失敗
      `);
      const missed: error = {
        type: "connection",
        status: error.status
      }
      return missed
    });

  const response = await apiKnock();
  return response;
}