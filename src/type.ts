import { NextApiRequest, NextApiResponse } from "next";

export type NextApiRequestFix = Omit<NextApiRequest, "body" | "query"> & { body: any; query: any; };

export type RequestHandler = (req: NextApiRequestFix, res: NextApiResponse) => void;

export type HandlerWithNext = (req: NextApiRequestFix, res: NextApiResponse, next?: () => Promise<void>) => void;
