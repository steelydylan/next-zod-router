import { NextApiRequest, NextApiResponse } from "next";
import { z } from 'zod' ;
import { ApiError, createError } from "./error";
import { HandlerWithNext, NextApiRequestFix } from "./type";

type HandlerObject = {
  handler: HandlerWithNext;
  middleware?: boolean;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
};

type ErrorHandler = (err: ApiError, req: NextApiRequestFix, res: NextApiResponse) => void;

type ApiZodSchema = {
  body?: z.ZodSchema<any>
  query?: z.ZodSchema<any>
  res?: z.ZodSchema<any>
  params?: z.ZodSchema<any>
}

export type ApiHandler<T extends ApiZodSchema> = {
  body: T["body"] extends z.ZodSchema<any> ? z.infer<T["body"]> : never;
  query: T["query"] extends z.ZodSchema<any> ? z.infer<T["query"]> : never;
  res:  T["res"] extends z.ZodSchema<any> ? z.infer<T["res"]>: never;
}

class Router {
  handlers: {
    method: HandlerObject[]
    error: ErrorHandler
  };

  constructor() {
    this.handlers = {
      method: [],
      error: (e, req, res) => {
        res.status(e.statusCode).json({ message: e.message });
      },
    };
  }

  use<T extends HandlerWithNext>(...handlers: T[]) {
    this.handlers.method.push(...handlers.map((handler) => ({ handler, middleware: true })));
    return this;
  }

  get<T extends HandlerWithNext>(...handlers: T[]) {
    this.handlers.method.push(...handlers.map((handler) => ({ handler, method: "GET" as "GET" })));
    return this;
  }

  post<T extends HandlerWithNext>(...handlers: T[]) {
    this.handlers.method.push(...handlers.map((handler) => ({ handler, method: "POST" as "POST" })));
    return this;
  }

  put<T extends HandlerWithNext>(...handlers: T[]) {
    this.handlers.method.push(...handlers.map((handler) => ({ handler, method: "PUT" as "PUT" })));
    return this;
  }

  delete<T extends HandlerWithNext>(...handlers: T[]) {
    this.handlers.method.push(...handlers.map((handler) => ({ handler, method: "DELETE" as "DELETE" })));
    return this;
  }

  patch<T extends HandlerWithNext>(...handlers: T[]) {
    this.handlers.method.push(...handlers.map((handler) => ({ handler, method: "PATCH" as "PATCH" })));
    return this;
  }

  onError<T extends ErrorHandler>(handler: T) {
    this.handlers.error = handler;
    return this;
  }

  private async execute(req: NextApiRequestFix, res: NextApiResponse, method: HandlerObject["method"]) {
    const handlers = this.handlers.method.filter((h) => h.method === method || h.middleware);
    let i = 0;
    const next = async () => {
      const handler = handlers[i++];
      if (handler) {
        await handler.handler(req, res, next);
      }
    };
    await next();
  }

  public run() {
    return async (req: NextApiRequestFix, res: NextApiResponse) => {
      try {
        await this.execute(req, res, req.method as HandlerObject["method"]);
      } catch (e) {
        if (e instanceof ApiError) {
          this.handlers.error(e, req, res);
        } else {
          const error = createError(500, "Internal Server Error");
          this.handlers.error(error, req, res);
        }
      }
    };
  }
}

export function createRouter() {
  const router = new Router();
  return router;
}
