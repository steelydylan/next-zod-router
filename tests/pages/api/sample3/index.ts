import { ApiHandler, createRouter, validate } from "../../../../src";
import { z } from "zod";

const getValidation = {
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
  .get(
    validate(getValidation),
    (req, res) => {
      req.query.bar;
      res.status(200).json({ message: "ok" });
    })

/* 型のexport */
export type GetHandler = ApiHandler<typeof getValidation>

/* ルーティング処理のexport */
export default router.run()
