import { createRouter } from "./src";
import { validate } from "./src/validation";
import { z } from "zod";

const router = createRouter();

router
  .post(
    validate({
      body: z.object({
        foo: z.string(),
      }),
      query: z.object({
        bar: z.string().optional(),
      }),
    }),
    (req, res) => {
      req.body.foo;
      res.status(200).json({ message: "ok" });
    })

export default router;

type Post = typeof router.handlers.post

type Req = Parameters<Post[number]>[0]
type Body = Req['body']
