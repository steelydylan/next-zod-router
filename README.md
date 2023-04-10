# next-typed-connect

next.jsで型安全なAPIを作るためのライブラリ

## 使い方

### サーバーサイド

pages/api/sample.ts

```ts
import { ApiHandler, createRouter, validate } from "../../src";
import { z } from "zod";

/* zodによるschema定義 */
const postValidation = {
  body: z.object({
    foo: z.string(),
  }),
  query: z.object({
    bar: z.string().optional(),
  }),
  res: z.object({
    message: z.string(),
  }),
}

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
  .post(
    validate(postValidation),
    (req, res) => {
      req.body.foo;
      req.query.bar;
      res.status(200).json({ message: "ok" });
    })
  .get(
    validate(getValidation),
    (req, res) => {
      req.query.bar;
      res.status(200).json({ message: "ok" });
    })

/* 型のexport */
export type PostHandler = ApiHandler<typeof postValidation>
export type GetHandler = ApiHandler<typeof getValidation>

/* ルーティング処理のexport */
export default router.run()
```

### クライアントサイド

```ts
import { postApiData, getApiData } from "next-typed-connect";

// 型安全にAPIを叩ける
postApiData("/api/sample", {
  query: {
    bar: "baz",
  },
  requestInit: {
    body: {
      foo: "bar",
    },
  }
})
  .then((res) => {
    res.message;
  })
  .catch((err) => {
    err.message;
  });