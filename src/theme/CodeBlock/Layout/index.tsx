import { useCodeBlockContext } from "@docusaurus/theme-common/internal";
import Buttons from "@theme/CodeBlock/Buttons";
import Container from "@theme/CodeBlock/Container";
import Content from "@theme/CodeBlock/Content";
import type { Props } from "@theme/CodeBlock/Layout";
import Title from "@theme/CodeBlock/Title";
import clsx from "clsx";
import { type ReactNode } from "react";

import styles from "./styles.module.css";

export default function CodeBlockLayout({ className }: Props): ReactNode {
  const { metadata } = useCodeBlockContext();
  return (
    <Container as="div" className={clsx(className, metadata.className)}>
      {metadata.title && (
        <div className={styles.codeBlockTitle}>
          <Title>{metadata.title}</Title>
        </div>
      )}
      <div className={styles.codeBlockContent}>
        <Content />
        <Buttons />
      </div>
    </Container>
  );
}
