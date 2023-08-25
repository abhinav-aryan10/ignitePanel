// eslint-disable-next-line import/no-unresolved
import axios from "axios";
// import axiosRetry from 'axios-retry';
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line import/no-unresolved
import { logoutUser, refreshTokenUtil } from "../utils/AwsCognito.util";
import { RoutePaths } from "../constants/Routepaths.constants";
// import { version as applicationVersion } from '../../../release/app/package.json';

// let token = "";

// Used only for local development when serve from mockoon is true
export const BaseUrl = axios.create({
  baseURL: process.env.API_URL,
});

// Util funciton to get login token
export function getAccessToken() {
  const accessToken = localStorage.getItem("accessToken") as string;
  if (accessToken) {
    return accessToken;
  }
  return "";
}

// Util funciton to get login token
export function getProductId() {
  let productDetails: any = localStorage.getItem("productDetails");
  if (productDetails) {
    productDetails = JSON.parse(productDetails);
    if (productDetails && productDetails.productId) {
      return productDetails.productId;
    }
    return "";
  }
  return "";
}

// Util funciton to check if ID token from cognito is expired or not
function getTokenExpiry() {
  const tokenExpiry = localStorage.getItem("userIdtokenExpiry") as string;
  if (tokenExpiry === null) {
    return false;
  }
  const currentTime = Number(Math.floor(new Date().getTime() / 1000));

  return !(Number(Number(tokenExpiry) - 3600) > currentTime);
}

export const Interceptor = () => {
  const navigate = useNavigate();
  // For GET requests
  axios.interceptors.request.use(
    async (req) => {
      //   req.headers = {
      //     ...req.headers,
      //     'app-version': applicationVersion,
      //   };
      if (
        !String(req.url).includes("product-details") &&
        !String(req.url).includes("roster-authentication")
      ) {
        // Add configurations here
        // token = getAccessToken();
        const isExpired = getTokenExpiry();
        if (isExpired) {
          try {
            await refreshTokenUtil()
              .then(() => {
                // req.headers = {
                //   ...req.headers,
                //   Authorization: `Bearer ${localStorage.getItem(
                //     'userIdToken'
                //   )}`,
                // };
                return 1;
              })
              .catch((err: any) => {
                logoutUser();
                localStorage.removeItem("userIdToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("userIdtokenExpiry");
                localStorage.removeItem("email");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userId");
                localStorage.removeItem("sub");
                sessionStorage.removeItem("upgradePopupDisplayed");
                setTimeout(() => {
                  navigate(RoutePaths.LOGIN_CARD);
                }, 300);

                return err;
              });
          } catch (error) {
            console.log("Error:", error);
          }
        } else {
          //   req.headers = {
          //     ...req.headers,
          //     Authorization: `Bearer ${localStorage.getItem('userIdToken')}`,
          //   };
        }
        // req.headers = {
        //   ...req.headers,
        //   'hatch-asset-Id': String(localStorage.getItem('HATCH_ASSET_ID')),
        //   'security-code': 'hatch_development',
        //   'product-short-name': 'IGT',
        // };
      }
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // For POST requests
  axios.interceptors.response.use(
    (res) => {
      // Add configurations here
      // eslint-disable-next-line no-empty
      if (res.status === 200) {
      }
      return res;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return null;
};

// Retry API for 1 time after a failed response
// If using Mockoon => "BaseUrl", if using Submarine => "axios"
// axiosRetry(axios, {
//   retries: 1,
//   retryDelay: (retryCount: any) => {
//     console.log(`retry attempt: ${retryCount}`);
//     return retryCount;
//   },
//   retryCondition: (error: any) => {
//     return error.response.status === 500 || error.response.status === 503;
//   },
// });
const INSIGHT_URL_STAGING = "https://rmsstaging.hatchearlychildhood.com";
// const INSIGHT_URL_PROD = "https://rms.hatchearlychildhood.com";
// const INSIGHT_URL_QA = "https://rmsqa.hatchearlychildhood.com";

// Staging
const INSIGHT_URL = INSIGHT_URL_STAGING;

// // QA
// const INSIGHT_URL = INSIGHT_URL_QA;

// // Prod
// const INSIGHT_URL = INSIGHT_URL_PROD;

export const ONBOARDING_URLS = {
  manageClass: `${INSIGHT_URL}/insightclassroom/view?`,
  viewReportsRecordings: `${INSIGHT_URL}/reports/ignitetable?`,
  noClass: `${INSIGHT_URL}/onboarding/ignitetable/teacher/needsclass?`,
  noChildren: `${INSIGHT_URL}/onboarding/ignitetable/teacher/needschildren?`,
  noDisplayPicture: `${INSIGHT_URL}/onboarding/ignitetable/teacher/needschildren?`, // Todo: Make changes after 20th March
};

export const serveFromMockoon = false;

// Staging
export const baseURL = "https://staging-api.hatchearlylearning.com/api";
export const urlForClassLink = `https://launchpad.classlink.com/oauth2/v2/auth?scope=full,profile&redirect_uri=https%3A%2F%2Frmsstaging.hatchearlychildhood.com%2Fclasslink%2Fauthweb&client_id=c1602175418505e68d0ca0d029f02cb965f0a25755bd&response_type=code&state=IGT_`;
export const urlForClever = `https://clever.com/oauth/authorize?scope=full,profile&redirect_uri=https%3A%2F%2Frmsstaging.hatchearlychildhood.com%2Fclever%2Fauth&client_id=db90c07eb7410402cb25&response_type=code&state=igt_`;

// // QA
// export const baseURL = 'https://qa-api.hatchearlylearning.com/api';

// // Prod
// export const baseURL = 'https://api.hatchearlylearning.com/api';
// export const urlForClassLink = `https://launchpad.classlink.com/oauth2/v2/auth?scope=full,profile&redirect_uri=https%3A%2F%2Frms.hatchearlychildhood.com%2Fclasslink%2Fauthweb&client_id=c16021754185055cafb4470494668704b25cbcc7c466&response_type=code&state=IGT_`;
// export const urlForClever = `https://clever.com/oauth/authorize?scope=full,profile&redirect_uri=https%3A%2F%2Frms.hatchearlychildhood.com%2Fclever%2Fauth&client_id=c236f5b67e7ccd451ebf&response_type=code&state=igt_`;

export const version = "v3";
export const defaultTemporaryPassword = "hatch123";
