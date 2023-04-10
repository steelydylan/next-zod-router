# next-typed-connect

next.jsで型安全なAPIを作るためのライブラリ

## 使い方

### サーバーサイド

1. zodを使って、body, query, resの型を定義します。
2. createRouterでルーティング処理を作成します。
3. validateで作成したルーティング処理に型を付与します。
4. その型をGetHandler, PostHandlerとしてexportします。

```ts
// pages/api/sample.ts
import { ApiHandler, createRouter, validate } from "next-typed-connect";
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

### 型生成

```bash
npx next-typed-connect
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