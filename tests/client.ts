import { client } from '../src'


async function main() {
  client
    .get("/api/sample/[id]", { 
      query: { id: "1" },
    })

  const { data: result } = await client.post("/api/sample", {
    body: {
      fuga: "fuga",
      foo: "aaa"
    }
  })
};
