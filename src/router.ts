import { NextApiRequest, NextApiResponse } from "next";
import { z } from 'zod' ;

type RequestHandler = (req: NextApiRequest, res: NextApiResponse) => void;

type ErrorHandler = (err: ApiError, req: NextApiRequest, res: NextApiResponse) => void;

type ApiZodSchema = {
  body?: z.ZodSchema<any>
  query?: z.ZodSchema<any>
  res?: z.ZodSchema<any>
  params?: z.ZodSchema<any>
}

export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export type ApiHandler<T extends ApiZodSchema> = {
  body: T["body"] extends z.ZodSchema<any> ? z.infer<T["body"]> : never;
  query: T["query"] extends z.ZodSchema<any> ? z.infer<T["query"]> : never;
  res:  T["res"] extends z.ZodSchema<any> ? z.infer<T["res"]>: never;
}

class Router<
GetHandler extends RequestHandler, 
PostHandler extends RequestHandler, 
PutHandler extends RequestHandler, 
DeleteHandler extends RequestHandler, 
PatchHandler extends RequestHandler> {
  handlers: {
    use: RequestHandler[];
    get: GetHandler[];
    post: PostHandler[];
    put: PutHandler[];
    delete: DeleteHandler[];
    patch: PatchHandler[];
    error: ErrorHandler
  };

  constructor() {
    this.handlers = {
      use: [],
      get: [],
      post: [],
      put: [],
      delete: [],
      patch: [],
      error: (e, req, res) => {
        res.status(e.statusCode).json({ message: e.message });
      },
    };
  }

  use<T extends RequestHandler>(...handlers: T[]) {
    this.handlers.use.push(...handlers);
    return this;
  }
  get<T extends GetHandler>(...handlers: T[]) {
    this.handlers.get.push(...handlers);
    return this;
  }
  post<T extends PostHandler>(...handlers: T[]) {
    this.handlers.post.push(...handlers);
    return this;
  }
  put<T extends PutHandler>(...handlers: T[]) {
    this.handlers.put.push(...handlers);
    return this;
  }
  delete<T extends DeleteHandler>(...handlers: T[]) {
    this.handlers.delete.push(...handlers);
    return this;
  }
  patch<T extends PatchHandler>(...handlers: T[]) {
    this.handlers.patch.push(...handlers);
    return this;
  }
  onError<T extends ErrorHandler>(handler: T) {
    this.handlers.error = handler;
    return this;
  }
  private async dispatch(handlers: RequestHandler[], req: NextApiRequest, res: NextApiResponse) {
    try {
      for (const handler of handlers) {
        if (res.writableEnded) break;
        await handler(req, res);
      }
    } catch (e) {
      if (e instanceof ApiError) {
        this.handlers.error(e, req, res);
      } else {
        const error = createError(500, "Internal Server Error");
        this.handlers.error(error, req, res);
      }
    }
  }
  public run() {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      await this.dispatch(this.handlers.use, req, res);
      switch (req.method) {
        case "GET":
          await this.dispatch(this.handlers.get, req, res)
          break;
        case "POST":
          await this.dispatch(this.handlers.post, req, res)
          break;
        case "PUT":
          await this.dispatch(this.handlers.put, req, res)
          break;
        case "DELETE":
          await this.dispatch(this.handlers.delete, req, res)
          break;
        case "PATCH":
          await this.dispatch(this.handlers.patch, req, res)
          break;
        default:
          res.status(405).json({ message: "Method not allowed" });
      }
    }
  }
}

export function createError(statusCode: number, message: string) {
  const error = new ApiError(message, statusCode);
  return error;
}

export function createRouter() {
  const router = new Router();
  return router;
}
