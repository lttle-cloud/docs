import { createContext, PropsWithChildren, useContext, useMemo } from "react";

const CodeBlockCommandContext = createContext({
  hasCommand: false,
  withCommand: false,
});

export function useCommandContext() {
  const ctx = useContext(CodeBlockCommandContext);

  return ctx;
}

type CodeBlockCommandProviderProps = {
  // Whether the code block contains command(s)
  hasCommand?: boolean;
  // Whether the code block is displayed alongside another code block containing command(s)
  withCommand?: boolean;
};

export function CodeBlockCommandProvider(
  props: PropsWithChildren<CodeBlockCommandProviderProps>
) {
  const value = useMemo(
    () => ({
      hasCommand: props.hasCommand,
      withCommand: props.withCommand,
    }),
    [props.hasCommand, props.withCommand]
  );

  return (
    <CodeBlockCommandContext.Provider value={value}>
      {props.children}
    </CodeBlockCommandContext.Provider>
  );
}
