import { ThemeClassNames, usePrismTheme } from "@docusaurus/theme-common";
import { getPrismCssVariables } from "@docusaurus/theme-common/internal";
import clsx from "clsx";
import { type ComponentProps, type ReactNode } from "react";
import { useCommandContext } from "../context/command";
import styles from "./styles.module.css";

export default function CodeBlockContainer<T extends "div" | "pre">({
  as: As,
  ...props
}: { as: T } & ComponentProps<T>): ReactNode {
  const { hasCommand, withCommand } = useCommandContext();

  const prismTheme = usePrismTheme();
  const prismCssVariables = getPrismCssVariables(prismTheme);

  return (
    <As
      // Polymorphic components are hard to type, without `oneOf` generics
      {...(props as any)}
      style={prismCssVariables}
      className={clsx(
        props.className,
        hasCommand
          ? styles.codeBlockContainerCommand
          : withCommand
          ? styles.codeBlockContainerWithCommand
          : styles.codeBlockContainer,
        ThemeClassNames.common.codeBlock
      )}
    />
  );
}
