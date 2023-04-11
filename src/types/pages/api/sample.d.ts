import type { PostHandler, GetHandler } from "../../../../pages/api/sample";
declare module "@/types/pages/api" {
    interface PostQuery {
        "/api/sample": PostHandler;
    }
    interface GetQuery {
        "/api/sample": GetHandler;
    }
}
