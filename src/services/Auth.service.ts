/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import getApiAccessToken, {
  changeTemporaryPassword,
  resetTemporaryPassword,
} from "../utils/AwsCognito.util";
import { BaseUrl, serveFromMockoon, baseURL, version } from "./BaseUrl";
// import { version as applicationVersion } from '../../../release/app/package.json';

const options = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
// Removing Authorization Header for Product Details API since it's a public API
const optionForProductDetails = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
    "security-code": "hatch_development",
    "product-short-name": "IGT",
    // 'app-version': applicationVersion,
    "device-os": "windows",
  },
};

const reqObj = {
  productShortName: "IGT",
};

export default async function getProductDetails() {
  if (serveFromMockoon) {
    const res = await BaseUrl.post("api/v3/product-details", options);
    const eulaLatestVersion = localStorage.setItem(
      "eulaLatestVersion",
      res.data.payload.data.eula.version
    );
    return res.data;
  }
  const res = await axios.post(
    `${baseURL}/${version}/product-details`,
    reqObj,
    optionForProductDetails
  );
  const eulaLatestVersion = localStorage.setItem(
    "eulaLatestVersion",
    res.data.payload.data.eula.version
  );
  return res.data;
}

export function loginUser(requestBody: any) {
  return getApiAccessToken(requestBody);
}

export async function getUserDetails() {
  if (serveFromMockoon) {
    const res = await BaseUrl.get("/api/v3/user", options);
    return res.data;
  }
  const optionForUserDetail = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
  };
  const res = await axios.get(
    `${baseURL}/${version}/user`,
    optionForUserDetail
  );
  return res.data;
}

export async function updateUserDetails(requestBody: any) {
  const res = await axios.post(
    `${baseURL}/${version}/user/updateUser`,
    requestBody,
    optionForProductDetails
  );
  return res.data;
}

export function acceptEula(requestBody: any) {
  if (serveFromMockoon) {
    return BaseUrl.post("/api/v3/eula-accept", options).then(
      (res: any) => res.data
    );
  }
  const option = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
  };
  return axios
    .post(`${baseURL}/${version}/eula-accept`, requestBody, option)
    .then((res: any) => res.data);
}

// export function sendResetPasswordLink(requestBody: any) {
//   return BaseUrl.post('login/passwordResetLink', requestBody, options).then(
//     (res) => res.data
//   );
// }

export function classLinkDetails(requestBody: any) {
  if (serveFromMockoon) {
    return BaseUrl.post("/api/v3/user/roster-authentication", options).then(
      (res: any) => res.data
    );
  }
  return axios
    .post(
      `${baseURL}/${version}/user/roster-authentication`,
      requestBody,
      optionForProductDetails
    )
    .then((res: any) => {
      return res.data;
    });
}

export function changePassword(requestBody: any) {
  return changeTemporaryPassword(requestBody);
}

export function resetPassword(requestBody: any) {
  return resetTemporaryPassword(requestBody);
}

export function getPrivacyPolicy() {
  return BaseUrl.get("product/privacyPolicy", options).then(
    (res: any) => res.data
  );
}

export function getGameDetails() {
  return BaseUrl.get("product/gameDetails", options).then(
    (res: any) => res.data
  );
}
