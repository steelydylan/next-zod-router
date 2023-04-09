import { z } from 'zod' ;
import { NextApiRequest, NextApiResponse } from "next";
type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type NextApiRequestExtended<T1, T2> = Override<NextApiRequest, { body: T1; query: T2 }>;

type ZodSchema = z.ZodSchema<any>
type Options<T1 extends ZodSchema, T2 extends ZodSchema> = {
  "body" ?: T1;
  "query"?: T2;
}

export const validate = <T1 extends ZodSchema, T2 extends ZodSchema>(options: Options<T1, T2>) => (req: NextApiRequestExtended<z.infer<T1>, z.infer<T2>>, res: NextApiResponse) => {
  Object.entries(options).forEach(([type, schema]) => {
    if (type === 'body') {
      const isSafe = schema.safeParse(req.body);
      if (!isSafe.success) {
        res.status(400).json({ error: isSafe.error });
        return;
      }
    } else if (type === 'query') {
      const isSafe = schema.safeParse(req.query);
      if (!isSafe.success) {
        res.status(400).json({ error: isSafe.error });
        return;
      }
    }
  });
}
