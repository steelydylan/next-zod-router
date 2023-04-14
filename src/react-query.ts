import { useQuery } from 'react-query'
import { client } from './client';
import { GetQuery } from ".next-zod-router";

type GetOptions<T extends keyof GetQuery> = {
  query?: GetQuery[T]["query"];
  requestInit?: Omit<RequestInit, "body">;
}

export function useQueryClient<T extends keyof GetQuery>(key: T, options?: GetOptions<T>) {
  const { data, ...rest } = useQuery([key, 'get', options], () => client.get(key, options));
  return {
    ...rest,
    data: data?.data,
    error: data?.error,
  }
}