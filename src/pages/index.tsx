import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";
import type { ReactNode } from "react";
import HeroImage from "@site/static/img/hero-illustration.svg";
import HomepageSocials from "@site/src/components/HomepageSocials";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const brand = (siteConfig.customFields as any)?.brandTitleParts as
    | {
        lttle: string;
        dot: string;
        cloud: string;
        suffix: string;
        taglineHtml: string;
      }
    | undefined;
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className={clsx(styles.heroBannerContent)}>
        <Heading as="h1">
          {brand ? (
            <>
              <span className={styles.brandTitle}>
                <span className={styles.brandTitleParts}>
                  <span className={styles.brandLttle}>{brand.lttle}</span>
                  <span className={styles.brandDot}>{brand.dot}</span>
                  <span className={styles.brandCloud}>{brand.cloud}</span>
                </span>
                <span>{brand.suffix}</span>
              </span>
            </>
          ) : (
            siteConfig.title
          )}
        </Heading>
        <p
          className={styles.brandTagline}
          dangerouslySetInnerHTML={{
            __html: brand?.taglineHtml || siteConfig.tagline,
          }}
        />
        <code className={styles.heroBannerCode}>
          <span className={styles.green}>curl</span>{" "}
          <span className={styles.purpleItalic}>-fsSL</span>{" "}
          <span>https://install.lttle.sh</span> <span>|</span>{" "}
          <span className={styles.green}>bash</span>
        </code>
        <div className={styles.buttons}>
          <Link className="button button--lg" to="/docs/introduction">
            start now
          </Link>
        </div>
      </div>

      <div className={clsx(styles.heroBannerImage)}>
        <HeroImage className={styles.heroImage} />
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageSocials />
      </main>
    </Layout>
  );
}
