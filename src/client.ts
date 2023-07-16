import { DeleteQuery, PatchQuery, GetQuery, PostQuery, PutQuery } from ".next-zod-router";
import qs from "qs";

const defaultHeaders = {
  "Content-Type": "application/json",
};

function buildParams(url: string, params?: Record<string, string>) {
  if (!params) {
    return { url, usedKeys: [] };
  }
  // find [vars] in url
  const usedKeys: string[] = [];
  const matches = url.match(/\[([^\]]+)\]/g);
  const replacedUrl = matches
    ? matches.reduce((acc, match) => {
        const key = match.slice(1, -1);
        const value = params[key];
        if (!value) {
          return acc;
        }
        usedKeys.push(key);
        return acc.replace(match, value);
      }
      , url)
    : url;
  return {
    url: replacedUrl,
    usedKeys,
  };
}

function buildQuery(url: string, query?: Record<string, string>) {
  if (!query) {
    return url;
  }
  if (Object.keys(query).length === 0) {
    return url;
  }
  const queryString = qs.stringify(query, { arrayFormat: 'repeat' });
  return `${url}?${queryString}`;
}

function buildUrl(url: string, query?: Record<string, string>) {
  if (!query) {
    return url;
  }
  const { url: replacedUrl, usedKeys } = buildParams(url, query)
  const unUsedKeys = Object.keys(query || {}).filter((key) => !usedKeys.includes(key));
  const unUsedQuery = unUsedKeys.reduce((acc, key) => {
    acc[key] = query[key];
    return acc;
  }, {} as Record<string, string>);
  const finalUrl = buildQuery(replacedUrl, unUsedQuery);
  return finalUrl;
}

export async function postApiData<T extends keyof PostQuery>(
  key: T,
  {
    query,
    body,
    requestInit,
  }: {
    query?: PostQuery[T]["query"];
    body?: PostQuery[T]["body"];
    requestInit?: Omit<RequestInit, "body"> & { body?: PostQuery[T]["body"] };
  } = {}
): Promise<{ data: PostQuery[T]["res"] | null, error: unknown | null }> {
  if (typeof key !== "string") {
    return {
      data: null,
      error: new Error("url key must be string"),
    }
  }
  const url = buildUrl(key, query);
  // if [vars] in url, not fetch
  if (url.includes("[") && url.includes("]")) {
    return {
      data: null,
      error: new Error("query must be set"),
    }
  }
  const requestBody = body || requestInit?.body;
  const res = await fetch(url, {
    ...requestInit,
    method: "POST",
    headers: { ...defaultHeaders, ...requestInit?.headers },
    body: requestBody ? JSON.stringify(requestBody) : undefined
  })
  .then((res) => {
    if (res.ok) return res.json()
    throw new Error(res.statusText)
  })
  .then((data) => {
    return {
      data,
      error: null,
    }
  })
  .catch((err) => {
    return {
      data: null,
      error: err,
    }
  });
  return res
}

export async function putApiData<T extends keyof PutQuery>(
  key: T,
  {
    query,
    body,
    requestInit,
  }: {
    query?: PutQuery[T]["query"];
    body?: PutQuery[T]["body"];
    requestInit?: Omit<RequestInit, "body"> & { body?: PutQuery[T]["body"] };
  } = {}
): Promise<{ data: PutQuery[T]["res"] | null, error: unknown | null }> {
  if (typeof key !== "string") {
    return {
      data: null,
      error: new Error("url key must be string"),
    }
  }
  const url = buildUrl(key, query);
  // if [vars] in url, not fetch
  if (url.includes("[") && url.includes("]")) {
    return {
      data: null,
      error: new Error("query must be set"),
    }
  }
  const requestBody = body || requestInit?.body;
  const res = await fetch(url, {
    ...requestInit,
    method: "PUT",
    headers: { ...defaultHeaders, ...requestInit?.headers },
    body: requestBody ? JSON.stringify(requestBody) : undefined
  })
  .then((res) => {
    if (res.ok) return res.json()
    throw new Error(res.statusText)
  })
  .then((data) => {
    return {
      data,
      error: null,
    }
  })
  .catch((err) => {
    return {
      data: null,
      error: err,
    }
  });
  return res
}

export async function patchApiData<T extends keyof PatchQuery>(
  key: T,
  {
    query,
    body,
    requestInit,
  }: {
    query?: PatchQuery[T]["query"];
    body?: PatchQuery[T]["body"];
    requestInit?: Omit<RequestInit, "body"> & { body?: PatchQuery[T]["body"] };
  } = {}
): Promise<{ data: PatchQuery[T]["res"] | null, error: unknown | null }> {
  if (typeof key !== "string") {
    return {
      data: null,
      error: new Error("url key must be string"),
    }
  }
  const url = buildUrl(key, query);
  // if [vars] in url, not fetch
  if (url.includes("[") && url.includes("]")) {
    return {
      data: null,
      error: new Error("query must be set"),
    }
  }
  const requestBody = body || requestInit?.body;
  const res = await fetch(url, {
    ...requestInit,
    method: "PATCH",
    headers: { ...defaultHeaders, ...requestInit?.headers },
    body: requestBody ? JSON.stringify(requestBody) : undefined
  })
  .then((res) => {
    if (res.ok) return res.json()
    throw new Error(res.statusText)
  })
  .then((data) => {
    return {
      data,
      error: null,
    }
  })
  .catch((err) => {
    return {
      data: null,
      error: err,
    }
  });
  return res
}

export async function deleteApiData<T extends keyof DeleteQuery>(
  key: T,
  {
    query,
    body,
    requestInit,
  }: {
    query?: DeleteQuery[T]["query"];
    body?: DeleteQuery[T]["body"];
    requestInit?: Omit<RequestInit, "body"> & { body?: DeleteQuery[T]["body"] };
  } = {}
): Promise<{ data: DeleteQuery[T]["res"] | null, error: unknown | null }> {
  if (typeof key !== "string") {
    return {
      data: null,
      error: new Error("url key must be string"),
    }
  }
  const url = buildUrl(key, query);
  // if [vars] in url, not fetch
  if (url.includes("[") && url.includes("]")) {
    return {
      data: null,
      error: new Error("query must be set"),
    }
  }
  const requestBody = body || requestInit?.body;
  const res = await fetch(url, {
    ...requestInit,
    method: "DELETE",
    headers: { ...defaultHeaders, ...requestInit?.headers },
    body: requestBody ? JSON.stringify(requestBody) : undefined
  })
  .then((res) => {
    if (res.ok) return res.json()
    throw new Error(res.statusText)
  })
  .then((data) => {
    return {
      data,
      error: null,
    }
  })
  .catch((err) => {
    return {
      data: null,
      error: err,
    }
  });
  return res
}

export async function getApiData<T extends keyof GetQuery>(
  key: T,
  {
    query,
    requestInit,
  }: {
    query?: GetQuery[T]["query"];
    requestInit?: Omit<RequestInit, "body">;
  } = {}
): Promise<{ data: GetQuery[T]["res"] | null, error: unknown | null }> {
  if (typeof key !== "string") {
    return {
      data: null,
      error: new Error("url key must be string"),
    }
  }
  const url = buildUrl(key, query);
  // if [vars] in url, not fetch
  if (url.includes("[") && url.includes("]")) {
    return {
      data: null,
      error: new Error("query must be set"),
    }
  }
  const res = await fetch(url, {
    ...requestInit,
    method: "GET",
    headers: { ...defaultHeaders, ...requestInit?.headers },
  })
  .then((res) => {
    if (res.ok) return res.json()
    throw new Error(res.statusText)
  })
  .then((data) => {
    return {
      data,
      error: null,
    }
  })
  .catch((err) => {
    return {
      data: null,
      error: err,
    }
  });
  return res
}

export const client = {
  post: postApiData,
  put: putApiData,
  patch: patchApiData,
  delete: deleteApiData,
  get: getApiData,
};
