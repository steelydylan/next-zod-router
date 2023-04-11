import { DeleteQuery, PatchQuery, GetQuery, PostQuery, PutQuery } from ".next-typed-connect";
import qs from "qs";

const defaultHeaders = {
  "Content-Type": "application/json",
};

function buildParams(url: string, params: Record<string, string>) {
  // find [vars] in url
  const matches = url.match(/\[([^\]]+)\]/g);
  const replacedUrl = matches
    ? matches.reduce((acc, match) => {
        const key = match.slice(1, -1);
        const value = params[key];
        if (!value) {
          return acc;
        }
        return acc.replace(match, value);
      }
      , url)
    : url;
  return replacedUrl;
}

function buildQuery(url: string, query: Record<string, string>) {
  const queryString = qs.stringify(query);
  return `${url}?${queryString}`;
}

function buildUrl(url: string, params?: Record<string, string>, query?: Record<string, string>) {
  let replacedUrl = url;
  if (params) {
    replacedUrl = buildParams(replacedUrl, params);
  }
  if (query) {
    replacedUrl = buildQuery(replacedUrl, query);
  }
  return replacedUrl;
}

export async function postApiData<T extends keyof PostQuery>(
  key: T,
  {
    query,
    body,
    params,
    requestInit,
  }: {
    query?: PostQuery[T]["query"];
    body?: PostQuery[T]["body"];
    params?: PostQuery[T]["body"];
    requestInit?: Omit<RequestInit, "body"> & { body?: PostQuery[T]["body"] };
  } = {}
): Promise<{ data: PostQuery[T]["res"] | null, error: unknown | null }> {
  if (typeof key !== "string") {
    return {
      data: null,
      error: new Error("url key must be string"),
    }
  }
  const url = buildUrl(key, params, query);
  const requestBody = body || requestInit?.body;
  const res = await fetch(url, {
    ...requestInit,
    method: "POST",
    headers: { ...defaultHeaders, ...requestInit?.headers },
    body: requestBody ? JSON.stringify(requestBody) : undefined
  })
  .then((res) => res.json())
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
    params,
    body,
    requestInit,
  }: {
    query?: PutQuery[T]["query"];
    body?: PutQuery[T]["body"];
    params?: PutQuery[T]["params"];
    requestInit?: Omit<RequestInit, "body"> & { body?: PutQuery[T]["body"] };
  } = {}
): Promise<{ data: PutQuery[T]["res"] | null, error: unknown | null }> {
  if (typeof key !== "string") {
    return {
      data: null,
      error: new Error("url key must be string"),
    }
  }
  const url = buildUrl(key, params, query);
  const requestBody = body || requestInit?.body;
  const res = await fetch(url, {
    ...requestInit,
    method: "PUT",
    headers: { ...defaultHeaders, ...requestInit?.headers },
    body: requestBody ? JSON.stringify(requestBody) : undefined
  })
  .then((res) => res.json())
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
    params,
    body,
    requestInit,
  }: {
    query?: PatchQuery[T]["query"];
    params?: PatchQuery[T]["params"];
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
  const url = buildUrl(key, params, query);
  const requestBody = body || requestInit?.body;
  const res = await fetch(url, {
    ...requestInit,
    method: "PATCH",
    headers: { ...defaultHeaders, ...requestInit?.headers },
    body: requestBody ? JSON.stringify(requestBody) : undefined
  })
  .then((res) => res.json())
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
    params,
    body,
    requestInit,
  }: {
    query?: DeleteQuery[T]["query"];
    params?: DeleteQuery[T]["params"];
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
  const url = buildUrl(key, params, query);
  const requestBody = body || requestInit?.body;
  const res = await fetch(url, {
    ...requestInit,
    method: "DELETE",
    headers: { ...defaultHeaders, ...requestInit?.headers },
    body: requestBody ? JSON.stringify(requestBody) : undefined
  })
  .then((res) => res.json())
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
    params,
    requestInit,
  }: {
    query?: GetQuery[T]["query"];
    params?: GetQuery[T]["params"];
    requestInit?: Omit<RequestInit, "body">;
  } = {}
): Promise<{ data: GetQuery[T]["res"] | null, error: unknown | null }> {
  if (typeof key !== "string") {
    return {
      data: null,
      error: new Error("url key must be string"),
    }
  }
  const url = buildUrl(key, params, query);
  const res = await fetch(url, {
    ...requestInit,
    method: "GET",
    headers: { ...defaultHeaders, ...requestInit?.headers },
  })
  .then((res) => res.json())
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
