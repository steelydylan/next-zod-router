import { client } from './client';
import { GetQuery } from ".next-zod-router";
import useSWR from 'swr';

type GetOptions<T extends keyof GetQuery> = {
  query?: GetQuery[T]["query"];
  requestInit?: Omit<RequestInit, "body">;
}

export function useSWRClient<T extends keyof GetQuery>(key: T, options?: GetOptions<T>) {
  const { data, ...rest } = useSWR([key, 'get', options], () => client.get(key, options));
  return {
    ...rest,
    data: data?.data,
    error: data?.error,
  }
}
