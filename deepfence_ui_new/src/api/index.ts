export const TOKEN_KEY = 'authToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

export type GeneralMessage = {
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
};

class GeneralError extends Error {
  type: string;
  constructor(message: string) {
    super(message);
    this.type = 'Error';
  }
}

export function decodeJwtToken(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export const clearLocalStorageToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const addLocalStorageToken = (access_token: string, refresh_token: string) => {
  localStorage.setItem(TOKEN_KEY, access_token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
};

/**
 * first it checks for token in localstorage
 * no token means not active session
 * token present means session is active however it will be inactive
 * if refresh token fails
 */
export async function isUserSessionActive() {
  let isSessionActive = false;
  const authToken = localStorage.getItem(TOKEN_KEY);
  if (authToken) {
    setInterval(() => {
      refreshAuthTokenIfRequired();
    }, 60 * 5 * 1000);

    await refreshAuthTokenIfRequired()
      .then(() => {
        isSessionActive = true;
      })
      .catch(() => {
        isSessionActive = false;
      });
  }
  return isSessionActive;
}

async function refreshAuthTokenIfRequired() {
  if (localStorage.getItem(TOKEN_KEY)) {
    const jwt = decodeJwtToken(localStorage.getItem(TOKEN_KEY) || '');
    const currentTime = new Date();
    const authTokenExpiryTime = new Date(jwt.exp * 1000);
    const timeDiff = authTokenExpiryTime.getTime() - currentTime.getTime();
    const minuteDiff = Math.round(timeDiff / 60000);
    if (minuteDiff < 30) {
      const url = `${getBaseUrl()}/users/refresh/token`;
      return fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAuthHeader(REFRESH_TOKEN_KEY),
        },
      })
        .then((response: Response) => {
          const resp = response.json() as unknown as {
            success: boolean;
            data: {
              access_token: string;
              refresh_token: string;
            };
          };
          if (resp.success) {
            addLocalStorageToken(resp.data.access_token, resp.data.refresh_token);
            return;
          } else {
            clearLocalStorageToken();
            return new Error('Error on refresh token.');
          }
        })
        .catch(() => {
          clearLocalStorageToken();
          return new Error('Error on refresh token.');
        });
    }
  }
}

// Method to return backend API end point
export function getBaseUrl() {
  return 'https://threatmapper.deepfence.show/deepfence/v1.5';
  if (process.env.API_BASE_URL) {
    return `${process.env.API_BASE_URL}/deepfence/v1.5`;
  }
  return `${window.location.protocol}//${window.location.host}/deepfence/v1.5`;
}

export function getAuthHeader(key: string) {
  const authToken = localStorage.getItem(key);
  let auth = '';
  if (authToken) {
    auth = `Bearer ${authToken}`;
  }
  return auth;
}

export const isResponse = (response: unknown): response is Response => {
  return response instanceof Response;
};

/**
 * we use this wrapper for api call functions
 * because we do not want to use try catch blocks
 * in our actions and loaders. this wrapper wraps
 * the function responsible for calling apis in a
 * try catch blocks and returns the error response
 * to the caller with an ability to provide a callback
 * that dictates what to do with the non ok response
 * codes.
 */
export async function apiWrapper<ResponseType>(
  promiseFn: Promise<ResponseType>,
  errorHandler?: (resp: Response) => Response | Promise<Response>,
): Promise<ResponseType | Response> {
  try {
    const response = await promiseFn;
    return response;
  } catch (e: unknown) {
    if (isResponse(e) && e.status === 401) {
      console.log('Redirect to login page.');
      return e;
    }
    if (isResponse(e) && errorHandler) {
      return await errorHandler(e);
    }
    console.error(e);
    throw new GeneralError('Something unexpected happened, please try again later.');
  }
}

export const api = {
  GET: (path: string) => {
    const url = `${getBaseUrl()}/${path}`;
    return fetch(url, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(TOKEN_KEY),
      },
    });
  },
  POST: <I, R>(path: string, body?: I): Promise<R> => {
    const url = `${getBaseUrl()}/${path}`;
    return fetch(url, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(TOKEN_KEY),
      },
    }).then((r) => r.json());
  },
};
