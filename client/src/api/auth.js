//import { basePath } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function getAccessToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken || accessToken === "null") {
    return null;
  }

  // si regresa true es que el token ha expirado por lo tanto como respuesta genera un null
  // si el token no ha expirado regrsa el accessToken
  return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken || refreshToken === "null") {
    return null;
  }
  return willExpireToken(refreshToken) ? null : refreshToken;
}

function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  //se optiene la fecha del sistema para comparar con la fecha del accessToken y saber si ya espiro  o no
  const now = (Date.now() + seconds) / 1000;
  // comparacion de las fechas, regresa true si el token expiro y false si aun esta vigente
  return now > exp;
}
