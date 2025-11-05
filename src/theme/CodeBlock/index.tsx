import useIsBrowser from "@docusaurus/useIsBrowser";
import type { Props } from "@theme/CodeBlock";
import ElementContent from "@theme/CodeBlock/Content/Element";
import StringContent from "@theme/CodeBlock/Content/String";
import React, { isValidElement, type ReactNode } from "react";
import { CodeBlockCommandProvider } from "./context/command";

/**
 * Best attempt to make the children a plain string so it is copyable. If there
 * are react elements, we will not be able to copy the content, and it will
 * return `children` as-is; otherwise, it concatenates the string children
 * together.
 */
function maybeStringifyChildren(children: ReactNode): ReactNode {
  if (React.Children.toArray(children).some((el) => isValidElement(el))) {
    return children;
  }
  // The children is now guaranteed to be one/more plain strings
  return Array.isArray(children) ? children.join("") : (children as string);
}

/**
 * Checks to see if the metastring contains contains a bash command like so
 * `command="npm install"`
 * If it does, it will return the command, otherwise it returns null
 */
function getCommand(metastring: Props["metastring"]): null | string {
  const match = /command=["'](.*)["']/.exec(metastring ?? "");
  return match?.[1] ?? null;
}

/**
 * Transforms <NEW_LINE> sequences into actual new lines for multi-line commands
 */
function formatCommand(command: string): string {
  // For now we only support bash commands
  return command.replace(/<NEW_LINE>/g, "\\\n");
}

export default function CodeBlock({
  children: rawChildren,
  hasCommand = false,
  ...props
}: Props & { hasCommand?: boolean }): ReactNode {
  // The Prism theme on SSR is always the default theme but the site theme can
  // be in a different mode. React hydration doesn't update DOM styles that come
  // from SSR. Hence force a re-render after mounting to apply the current
  // relevant styles.
  const isBrowser = useIsBrowser();
  const children = maybeStringifyChildren(rawChildren);

  const CodeBlockComp =
    typeof children === "string" ? StringContent : ElementContent;

  const command = getCommand(props.metastring);

  let metastring = props.metastring;

  let formattedCommand = "";
  if (command) {
    // Remove the command from the metastring so that it doesn't appear in the
    metastring = metastring.replace(`command="${command}"`, "").trim();

    formattedCommand = formatCommand(command);

    console.log(command, "=>", formattedCommand);
  }

  return (
    <>
      {command && (
        <CodeBlock
          className="language-bash"
          children={formattedCommand}
          hasCommand
        />
      )}
      <CodeBlockCommandProvider hasCommand={hasCommand} withCommand={!!command}>
        <CodeBlockComp
          key={String(isBrowser)}
          {...props}
          metastring={metastring}
        >
          {children as string}
        </CodeBlockComp>
      </CodeBlockCommandProvider>
    </>
  );
}
