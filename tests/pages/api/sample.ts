import { ApiHandler, createRouter, validate } from "../../../src";
import { z } from "zod";

/* zodによるschema定義 */
const postValidation = {
  body: z.object({
    foo: z.string(),
    fuga: z.string().optional(),
  }),
  query: z.object({
    bar: z.string().optional(),
  }),
  res: z.object({
    message: z.string(),
  }),
}  

/* ルーティング処理 */
const router = createRouter()

router
  .use((req, res) => {
    console.log("middleware");
  })
  .post(
    validate(postValidation),
    (req, res) => {
      req.body.foo;
      req.query.bar;
      res.status(200).json({ message: "ok" });
    })


/* 型のexport */
export type PostHandler = ApiHandler<typeof postValidation>

/* ルーティング処理のexport */
export default router.run()
