export class HttpError<T> extends Error {
  status: number;
  payload: T;

  constructor(status: number, payload: T) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const request = async <T>(
  method: HttpMethod,
  url: string,
  body?: BodyInit,
  headers: Record<string, string> = {}
) => {
  const baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const res = await fetch(url, {
    method,
    headers: { ...baseHeaders, ...headers },
    body: method === "GET" ? undefined : body,
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new HttpError(res.status, payload);
  }

  return {
    status: res.status,
    payload,
  } as { status: number; payload: T };
};

const http = {
  get<T>(
    url: string,
    params?: Record<string, string>,
    headers?: Record<string, string>
  ) {
    const query = params ? `?${new URLSearchParams(params)}` : "";
    return request<T>("GET", url + query, undefined, headers);
  },

  post<T>(
    url: string,
    body?: Record<string, string>,
    headers?: Record<string, string>
  ) {
    return request<T>("POST", url, JSON.stringify(body), headers);
  },

  put<T>(
    url: string,
    body?: Record<string, string>,
    headers?: Record<string, string>
  ) {
    return request<T>("PUT", url, JSON.stringify(body), headers);
  },
  patch<T>(
    url: string,
    body?: Record<string, string>,
    headers?: Record<string, string>
  ) {
    return request<T>("PATCH", url, JSON.stringify(body), headers);
  },
  delete<T>(url: string, headers?: Record<string, string>) {
    return request<T>("DELETE", url, undefined, headers);
  },
};

export default http;
