import { hostname } from "os";

class HttpError<T> extends Error {
  status: number;
  payload: T;
  constructor({ status, payload }: { status: number; payload: T }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

//url, body, header,method
const HOST_BASE = "https://graph.facebook.com/";
const VERSION_BASE = "v24.0";
const request = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  header: Headers,
  body?: BodyInit
) => {
  const extractUrl = url.startsWith("/")
    ? `${HOST_BASE}/${VERSION_BASE}/${url}`
    : `${HOST_BASE}/${VERSION_BASE}${url}`;
  const res = await fetch(extractUrl, {
    headers: { ...header },
    body,
    method,
  });

  const payload = await res.json();
  const data = {
    status: res.status,
    payload: payload,
  };
  if (!res.ok) {
    throw new HttpError(data);
  }
  return data;
};

const http = {
  get(url: string, headers: Headers, params: Record<string, string>) {
    const queryString = new URLSearchParams(params).toString();
    url = url.slice() + `?${queryString}`;
    request("GET", url, headers);
  },
  post(
    url: string,
    headers: Headers,
    body: BodyInit
  ) {
    request("GET", url, headers, body);
  },
};
export default http