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
          editUrl: "https://github.com/lttle-cloud/docs",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ["docusaurus-theme-search-typesense"],

  themeConfig: {
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
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorial",
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
              label: "Tutorial",
              to: "/docs/intro",
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
  } satisfies Preset.ThemeConfig & DeepPartial<TypesenseThemeConfig>,
});
