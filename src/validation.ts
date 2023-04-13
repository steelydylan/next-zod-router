import { z } from 'zod' ;
import { NextApiRequest, NextApiResponse } from "next";
import { createError } from './error';
type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type NextApiRequestExtended<T1, T2> = Override<NextApiRequest, { body: T1; query: T2 }>;
type NextApiResponseExtended<T> = NextApiResponse<T>;

type ZodSchema = z.ZodSchema<any>
type Options<T1 extends ZodSchema, T2 extends ZodSchema, T3 extends ZodSchema> = {
  "body" ?: T1;
  "query"?: T2;
  "res"?: T3;
}

export const validate = <T1 extends ZodSchema, T2 extends ZodSchema, T3 extends ZodSchema>(options: Options<T1, T2, T3>) => (req: NextApiRequestExtended<z.infer<T1>, z.infer<T2>>, res: NextApiResponseExtended<z.infer<T3>>, next?: () => Promise<void>) => {
  Object.entries(options).forEach(([type, schema]) => {
    if (type === 'body') {
      const isSafe = schema.safeParse(req.body);
      if (!isSafe.success) {
        throw createError(400, JSON.stringify(isSafe.error))
      }
    } else if (type === 'query') {
      const isSafe = schema.safeParse(req.query);
      if (!isSafe.success) {
        throw createError(400, JSON.stringify(isSafe.error.message))
      }
    }
  });
  if (next) return next();
}
