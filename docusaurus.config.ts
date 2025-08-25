import { getConfig } from "./docusaurus";

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
    // FIXME: Get api key from env var
    apiKey: "local-typesense-api-key",
  },
});
