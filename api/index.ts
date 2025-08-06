import serverless from "serverless-http";
import { createServer } from "../server"; // yoki kerakli to‘g‘ri nisbiy yo‘l

const handler = serverless(createServer());

export default handler;
