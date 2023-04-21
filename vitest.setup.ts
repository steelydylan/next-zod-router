import { rest } from "msw";
import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";

const restHandlers = [
  rest.post("/api/sample", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "hello" }));
  }),
  rest.post("/api/sample/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "hello" }));
  }),
  rest.post("/api/bad/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "hello" }));
  })
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
