import { client } from '../src'

client
  .get("/api/sample/[id]", { 
    query: { id: "1" },
  })