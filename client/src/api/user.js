import { basePath } from "./config";

export function LoginApi(data) {
  const url = `${basePath}/login-usuarios`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then(result =>{
        console.log(result);
        return result;
    })
    .catch((error) => {
      return error.message;
    });
}
