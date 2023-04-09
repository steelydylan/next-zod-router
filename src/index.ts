import { NextApiRequest, NextApiResponse } from "next";

type RequestHandler = (req: NextApiRequest, res: NextApiResponse) => void;

class Router<
GetHandler extends RequestHandler = RequestHandler, 
PostHandler extends RequestHandler = RequestHandler, 
PutHandler extends RequestHandler = RequestHandler, 
DeleteHandler extends RequestHandler = RequestHandler, 
PatchHandler extends RequestHandler = RequestHandler> {
  handlers: {
    use: RequestHandler[];
    get: GetHandler[];
    post: PostHandler[];
    put: PutHandler[];
    delete: DeleteHandler[];
    patch: PatchHandler[];
  };
  constructor() {
    this.run()
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
  private async dispatch(handlers: RequestHandler[], req: NextApiRequest, res: NextApiResponse) {
    for (const handler of handlers) {
      if (res.writableEnded) return;
      await handler(req, res);
    }
  }
  private run() {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      await this.dispatch(this.handlers.use, req, res);
      switch (req.method) {
        case "GET":
          this.dispatch(this.handlers.get, req, res)
          break;
        case "POST":
          this.dispatch(this.handlers.post, req, res)
          break;
        case "PUT":
          this.dispatch(this.handlers.put, req, res)
          break;
        case "DELETE":
          this.dispatch(this.handlers.delete, req, res)
          break;
        case "PATCH":
          this.dispatch(this.handlers.patch, req, res)
          break;
        default:
          res.status(405).json({ message: "Method not allowed" });
      }
    }
  }
}

export function createRouter() {
  const router = new Router();
  return router;
}
