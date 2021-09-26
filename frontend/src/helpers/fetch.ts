const baseUrl = process.env.REACT_APP_API_URL;

export interface IFetch {
  (
    endpoint: "signin" | "signup" | "book" | "renew" | `book/${string}`,
    data?: any,
    method?: "GET" | "POST" | "PUT" | "DELETE"
  ): Promise<any>;
}

export const fetchWithoutToken: IFetch = (endpoint, data, method = "GET") => {
  // http://localhost:4000/api/{endopoint}

  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchWithToken: IFetch = (endpoint, data, method = "GET") => {
  // http://localhost:4000/api/{endopoint}

  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }
};
