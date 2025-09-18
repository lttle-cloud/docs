import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { ThemeConfig as TypesenseThemeConfig } from "docusaurus-theme-search-typesense";
import { themes as prismThemes } from "prism-react-renderer";
import { DeepPartial } from "utility-types";

export type LttleDocusaurusConfig = {
  url: string;
  typesenseServerConfig: Pick<
    TypesenseThemeConfig["typesense"]["typesenseServerConfig"],
    "nodes" | "apiKey"
  >;
};

export const getConfig = (cfg: LttleDocusaurusConfig): Config => ({
  title: "lttle.cloud docs",
  tagline: "no rewrites. no cold starts. no paying for idle.",
  favicon: "img/favicon.ico",
  customFields: {
    brandTitleParts: {
      lttle: "lttle",
      dot: ".",
      cloud: "cloud",
      suffix: "docs",
      taglineHtml:
        "no rewrites.<br /> no cold starts.<br /> no paying for idle.",
    },
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: cfg.url,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/lttle-cloud/docs/tree/main",
          remarkPlugins: [
            [
              require("@docusaurus/remark-plugin-npm2yarn"),
              { sync: true, converters: ["yarn", "pnpm"] },
            ],
          ],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ["docusaurus-theme-search-typesense", "@docusaurus/theme-mermaid"],

  markdown: {
    mermaid: true,
  },

  themeConfig: {
    announcementBar: {
      id: "work_in_progress", // Increment on change
      content:
        '🚧 Work in progress. If you have any questions, join our <a href="https://discord.gg/xhNGGrZQja" target="_blank" rel="noopener noreferrer">Discord</a>! 🚧',
      backgroundColor: "var(--ifm-background-color)",
      textColor: "var(--ifm-color-primary)",
      isCloseable: false,
    },

    // TODO: Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",

    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "docs",
      logo: {
        alt: "lttle docs",
        src: "img/logo.svg",
        srcDark: "img/logo-dark.svg",
        height: 32,
        width: 43,
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "documentationSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          type: "docSidebar",
          sidebarId: "guidesSidebar",
          position: "left",
          label: "Guides & Samples",
        },
        {
          type: "docSidebar",
          sidebarId: "sdksSidebar",
          position: "left",
          label: "SDKs",
        },
        {
          href: "https://github.com/lttle-cloud/ignition",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "/docs/getting-started/installing-the-cli",
            },
            {
              label: "Deploying a static site",
              to: "/docs/getting-started/deploying-a-static-site",
            },
            {
              label: "Tutorials",
              to: "https://www.youtube.com/@awesome-coding/videos",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/xhNGGrZQja",
            },
            {
              label: "X",
              href: "https://x.com/lttlecloud_",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/lttle-cloud/ignition",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/lttle-cloud",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} lttle cloud. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      magicComments: [
        {
          className: "code-block-error-line",
          line: "code-block-error-line",
        },
      ],
      additionalLanguages: [
        "json",
        "yaml",
        "rust",
        "go",
        "bash",
        "docker",
        "nginx",
        "psl",
      ],
    },
    // TypeSense is configured with the same cfg as Algolia
    // But it uses a different search engine (Typesense)
    typesense: {
      typesenseCollectionName: "lttle-cloud-docs",

      typesenseServerConfig: {
        ...cfg.typesenseServerConfig,
      },

      // Optional: Typesense search parameters: https://typesense.org/docs/0.24.0/api/search.html#search-parameters
      typesenseSearchParameters: {},

      // Optional
      contextualSearch: true,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 6,
    },
  } satisfies Preset.ThemeConfig & DeepPartial<TypesenseThemeConfig>,
});
