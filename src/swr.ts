import { client } from './client';
import { GetQuery } from ".next-zod-router";
import useSWR from 'swr';

type GetOptions<T extends keyof GetQuery> = {
  query?: GetQuery[T]["query"];
  requestInit?: Omit<RequestInit, "body">;
  defaultValue?: GetQuery[T]["res"];
}

export function useClientSWR<T extends keyof GetQuery>(key: T, options?: GetOptions<T>) {
  const queryKey = [key, options?.query];
  const { data, ...rest } = useSWR(queryKey, () => client.get(key, options));
  return {
    ...rest,
    queryKey,
    data: data?.data ?? options?.defaultValue ?? null,
    error: data?.error,
  }
}
