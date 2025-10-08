---
sidebar_position: 3
---

# Configuring your editor

To be able to benefit from YAML schema validation and autocompletion, we recommend setting up your code editor or IDE as described below.

## Visual Studio Code

Install the [YAML Language Support from RedHat](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) extension for better YAML syntax highlighting and validation.

Create in the `.vscode` folder a `settings.json`, file with the following content:

```json
{
  "yaml.schemas": {
    "https://resources.lttle.sh": "/*.lttle.yaml"
  }
}
```

This will also work for Visual Studio Code spinoffs like **Cursor**.

## Other Editors / IDEs

Check your editors documentation on how to add schema definitions for YAML files.

:::info

If you are having trouble setting up your editor, feel free to reach out to us on [Discord](https://discord.gg/xhNGGrZQja).

:::
