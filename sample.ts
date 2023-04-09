import { createRouter } from "./src";
import { validate } from "./src/validation";
import { z } from "zod";

const router = createRouter()
  .use((req, res) => {
    console.log("middleware");
  })
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

export default router.run()

export type API = typeof router