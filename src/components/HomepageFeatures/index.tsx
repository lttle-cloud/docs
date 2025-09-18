import Heading from "@theme/Heading";
import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList1: FeatureItem[] = [
  {
    title: "lightweight",
    Svg: require("@site/static/img/chunk/folder-open.svg").default,
    description: (
      <>
        lttle.cloud is designed to be lightweight and efficient, with a focus on
        performance and scalability.
      </>
    ),
  },
  {
    title: "open source",
    Svg: require("@site/static/img/chunk/door-open.svg").default,
    description: (
      <>
        lttle.cloud is open source, and we&apos;re always looking for
        contributions.
      </>
    ),
  },
  {
    title: "simple",
    Svg: require("@site/static/img/chunk/checkmark.svg").default,
    description: (
      <>
        lttle.cloud is designed to be simple and easy to use, with a focus on
        usability and accessibility.
      </>
    ),
  },
];

const FeatureList2: FeatureItem[] = [
  {
    title: "secure",
    Svg: require("@site/static/img/chunk/shield-check.svg").default,
    description: (
      <>
        lttle.cloud is designed to be secure and reliable, with a focus on
        security and reliability.
      </>
    ),
  },
  {
    title: "community",
    Svg: require("@site/static/img/chunk/users.svg").default,
    description: (
      <>
        lttle.cloud is designed to be high performance, with a focus on
        performance and scalability.
      </>
    ),
  },
  {
    title: "high performance",
    Svg: require("@site/static/img/chunk/arrow-trend-up.svg").default,
    description: (
      <>
        lttle.cloud is designed to be high performance, with a focus on
        performance and scalability.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={styles.featureCard}>
      <Svg className={styles.featureSvg} role="img" />
      <Heading as="h2">{title}</Heading>
      <p>{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className={styles.featuresContainer}>
        <div className={styles.featuresSection}>
          <div className={styles.featuresHeader}>
            <Heading as="h2">key features</Heading>
            <p>grows with you, not against you</p>
          </div>
          <div className={styles.featuresRow}>
            {FeatureList1.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
        <div className={styles.featuresSection}>
          <div className={styles.featuresHeader}>
            <Heading as="h2">why lttle.cloud</Heading>
            <p>we keep things running, you keep moving</p>
          </div>
          <div className={styles.featuresRow}>
            {FeatureList2.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
