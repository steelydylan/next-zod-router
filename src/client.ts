import { DeleteQuery, PatchQuery, GetQuery, PostQuery, PutQuery } from ".next-typed-connect";
import qs from "qs";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export async function postApiData<
  T extends keyof PostQuery,
  ReqQuery extends PostQuery[T]["query"],
  ResBody extends PostQuery[T]["res"],
  ReqBody extends PostQuery[T]["body"]
>(
  key: T,
  {
    query,
    body,
    requestInit,
  }: {
    query?: ReqQuery;
    body?: ReqBody;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
  } = {}
): Promise<{ data: ResBody | null, error: unknown | null }> {
  const url = query ? `${key}?${qs.stringify(query)}` : key;
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

export async function putApiData<
  T extends keyof PutQuery,
  ReqQuery extends PutQuery[T]["query"],
  ResBody extends PutQuery[T]["res"],
  ReqBody extends PutQuery[T]["body"]
>(
  key: T,
  {
    query,
    body,
    requestInit,
  }: {
    query?: ReqQuery;
    body?: ReqBody;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
  } = {}
): Promise<{ data: ResBody | null, error: unknown | null }> {
  const url = query ? `${key}?${qs.stringify(query)}` : key;
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

export async function patchApiData<
  T extends keyof PatchQuery,
  ReqQuery extends PatchQuery[T]["query"],
  ResBody extends PatchQuery[T]["res"],
  ReqBody extends PatchQuery[T]["body"]
>(
  key: T,
  {
    query,
    body,
    requestInit,
  }: {
    query?: ReqQuery;
    body?: ReqBody;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
  } = {}
): Promise<{ data: ResBody | null, error: unknown | null }> {
  const url = query ? `${key}?${qs.stringify(query)}` : key;
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

export async function deleteApiData<
  T extends keyof DeleteQuery,
  ReqQuery extends DeleteQuery[T]["query"],
  ResBody extends DeleteQuery[T]["res"],
  ReqBody extends DeleteQuery[T]["body"]
>(
  key: T,
  {
    query,
    body,
    requestInit,
  }: {
    query?: ReqQuery;
    body?: ReqBody;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
  } = {}
): Promise<{ data: ResBody | null, error: unknown | null }> {
  const url = query ? `${key}?${qs.stringify(query)}` : key;
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

export async function getApiData<
  T extends keyof GetQuery,
  ReqQuery extends GetQuery[T]["query"],
  ResBody extends GetQuery[T]["res"]
>(
  key: T,
  {
    query,
    requestInit,
  }: {
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body">;
  } = {}
): Promise<{ data: ResBody | null, error: unknown | null }> {
  const url = query ? `${key}?${qs.stringify(query)}` : key;
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
