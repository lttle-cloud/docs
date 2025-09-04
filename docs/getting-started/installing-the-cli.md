---
sidebar_position: 1
---

# Installing the CLI

The easiest way is to use the install script:

```sh
curl -fsSL https://install.lttle.sh | bash
```

---

If you want to build it from source, you will need to have Rust and Cargo installed. You can find instructions on how to do that [here](https://www.rust-lang.org/tools/install).

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

You can symlink the binary to a directory in your PATH for easier access:

```sh
ls -sr ./target/release/lttle ~/.local/bin/lttle
```

:::
