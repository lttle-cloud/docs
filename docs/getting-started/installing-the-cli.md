---
sidebar_position: 1
---

# Installing the CLI

:::info

Right now we only support **Linux x86 64** and **MacOS Darwin Aarch64** (ARM 64). More platforms will be supported in the future.

:::

The easiest way is to use the install script:

```sh
curl -fsSL https://install.lttle.sh | bash
```

## Autocompletion

You can enable autocompletion for your shell by adding the following line to your shell configuration file:

We currently support `bash`, `zsh`, `fish`, `elvish` and `powershell`. Run the following command to get the exact command for your shell:

```sh
lttle completion <SHELL>
```

The command will try to update your shell configuration file automatically, but if it fails you can follow the instructions printed in the terminal.

## Updating

There is no automatic update mechanism yet. You need to re-run the install script to update to the latest version.

---

## Building from source

If you want to build it from source, you will need to have Rust and Cargo installed.

Then you can clone the repository:

```sh
git clone git@github.com:lttle-cloud/ignition.git
```

And then you can build the project using Cargo:

```sh
cargo build --release
```

And you will find it in `target/release/lttle`.

:::info Tip

You can symlink the binary to a directory in your `$PATH` for easier access:

```sh
ls -sr ./target/release/lttle ~/.local/bin/lttle
```

:::
