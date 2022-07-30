import { getAccessToken, isAuthenticated, removeTokens } from "./account";

import axios from "axios";
import { createError } from "@/components/Error";
import { displayErrorMessage } from "./message";
import getConfig from "@/configs/getConfig";
import history from "@/utils/history";
import qs from "qs";

const paramsSerializer = (params) =>
  qs.stringify(params, { arrayFormat: "repeat" });

const request = axios.create({
  paramsSerializer,
});

/**
 * Intercept authorized request.
 */
export function createRequestInterceptor() {
  return function interceptor(config) {
    const { apiUrl, enableShowBackendError } = getConfig();
    const { authenticated = true } = config;

    // Derived config from dynamic config
    config.baseURL = apiUrl;
    config.enableShowBackendError = enableShowBackendError;

    const baseConfig = {
      ...config,
      headers: { ...config.headers, "x-envoy-upstream-rq-timeout-ms": 30000 },
    };
    if (!authenticated) {
      return baseConfig;
    }
    const { headers } = baseConfig;
    const newHeaders = {
      ...headers,
      Authorization: `Bearer ${getAccessToken()}`,
    };
    return {
      ...config,
      headers: newHeaders,
    };
  };
}

export function getPathname(config) {
  const { url, baseURL } = config;
  if (baseURL) {
    return url.replace(baseURL, "");
  }
  return new URL(url).pathname;
}
export function notifyError(notifier, error) {
  const errorDetails = getErrorDetails(error);
  notifier(errorDetails);
}
/**
 * Notify error using Ant Design message.
 */
export function errorMessage(errorDetails) {
  // message.error(errorDetails);
  displayErrorMessage(errorDetails);
}
/**
 * Check if the given status is user error or not.
 */
export function isUserError({ response: { status } }) {
  return status >= 400 && status < 500;
}
/**
 * Check if the given status is server error or not.
 */
export function isServerError({ response: { status } }) {
  return status >= 500;
}
/**
 * Get error details from the error object.
 */
export function getErrorDetails(error) {
  let errorCode;
  let errorMessage;

  if (typeof error === "string") {
    errorCode = error;
  } else {
    const { response, config } = error;
    errorCode = response && response.data && response.data.messageCode;

    if (!errorCode || errorCode.endsWith("000")) {
      if (config.enableShowBackendError) {
        errorMessage = response && response.data && response.data.messageError;
        // Disable error code in case of having error message
        if (errorMessage) {
          errorCode = null;
        } else {
        }
      } else {
        errorCode = "request.failed";
      }
    }
  }
  return createError(errorCode, errorMessage);
}
/**
 * Check if the error is unauthorized error.
 */
export function isUnauthorized(error) {
  const status = error && error.response && error.response.status;
  return status === 403 || status === 401;
}
/**
 * Check if the error is request error or not.
 */
export function isRequestError({ response, request }) {
  return !response && !!request;
}
/**
 * Check if the error is response error or not.
 */
export function isResponseError({ response }) {
  return !!response;
}
export function createHandlerChain(handlers = []) {
  return function handlerChain(error) {
    const {
      config: { useDefaultErrorHandler = true },
    } = error;
    if (!useDefaultErrorHandler) {
      return Promise.reject(error);
    }
    const stack = [...handlers];
    function next() {
      if (stack.length === 0) {
        return;
      }
      const nextHandler = stack.pop();
      nextHandler(error, next);
    }
    next();
    return Promise.reject(error);
  };
}
export function serverErrorHandler(error, next) {
  if (!isResponseError(error) || !isServerError(error)) {
    return next();
  }
  notifyError(errorMessage, error);
}
export function userErrorHandler(error, next) {
  if (!isResponseError(error) || !isUserError(error)) {
    return next();
  }
  notifyError(errorMessage, error);
}
export async function unauthorizedErrorHandler(error, next) {
  if (isUnauthorized(error)) {
    const oldToken = isAuthenticated();
    // Redirect to login page if already logged in and session's expired

    // Redirect to landing page if it's new user
    if (oldToken) {
      errorMessage(getErrorDetails("401"));
      history.push("/user/sign-in");
    }
    removeTokens();
    return;
  }
  next();
}
export function requestErrorHandler(error, next) {
  if (!isRequestError(error)) {
    return next();
  }
  errorMessage(getErrorDetails("request.failed"));
}
export function otherErrorHandler(error, next) {
  if (
    isResponseError(error) ||
    isRequestError(error) ||
    isUnauthorized(error)
  ) {
    return next();
  }
  errorMessage(getErrorDetails("request.failed"));
}

function maintenanceHandler(error, next) {
  const status = error?.response?.status;
  if (status !== 503) {
    return next();
  }
  return history.push("/503");
}

export function parseResultsHandler(response) {
  const { data, config } = response;
  if (config.parseResponse === false) {
    return response;
  }

  return data?.results || data;
}

request.interceptors.request.use(createRequestInterceptor());
request.interceptors.response.use(
  parseResultsHandler,
  createHandlerChain([
    serverErrorHandler,
    userErrorHandler,
    unauthorizedErrorHandler,
    requestErrorHandler,
    otherErrorHandler,
    maintenanceHandler,
  ])
);

// Default request instance
export default request;
