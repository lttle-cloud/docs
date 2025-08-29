import { getConfig } from "./docusaurus";

export default getConfig({
  url: "https://docs.lttle.aifrim.example.com",
  typesenseServerConfig: {
    nodes: [
      {
        // FIXME: Get this from environment variable
        host: "docs-search.lttle.aifrim.com",
        port: 443,
        protocol: "https",
      },
    ],
    // FIXME: Get this from environment variable
    apiKey: "uVnR&EtnaLDfhTgLK$~'n#.NX>z",
  },
});
