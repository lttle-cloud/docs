import dotenv from "dotenv";
import { getConfig } from "./docusaurus";

dotenv.config({ path: ".env.production" });

export default getConfig({
  url: process.env.DOCS_URL,
  typesenseServerConfig: {
    nodes: [
      {
        host: process.env.TYPESENSE_FQDN,
        port: 443,
        protocol: "https",
      },
    ],
    apiKey: process.env.TYPESENSE_API_KEY,
  },
});
