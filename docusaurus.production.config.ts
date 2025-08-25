import { getConfig } from "./docusaurus";

export default getConfig({
  url: "https://docs.lttle.aifrim.example.com",
  typesenseServerConfig: {
    nodes: [
      {
        // TODO:
        host: "docs-search.lttle.aifrim.com",
        port: 443,
        protocol: "https",
      },
    ],
    // FIXME: Get this from environment variable secret
    apiKey: "uVnR&EtnaLDfhTgLK$~'n#.NX>z",
  },
});
