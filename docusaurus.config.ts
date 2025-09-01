import dotenv from "dotenv";
import { getConfig } from "./docusaurus";

dotenv.config({ path: ".env" });

export default getConfig({
  url: "http://localhost:3000",
  typesenseServerConfig: {
    nodes: [
      {
        host: "localhost",
        port: 8108,
        protocol: "http",
      },
    ],
    apiKey: process.env.TYPESENSE_API_KEY,
  },
});
