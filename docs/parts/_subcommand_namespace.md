All of these subcommands run assuming you are checking the default (`default`) namespace in your profile. You can override this behavior using the following options:

- `--namespace <NAMESPACE>` (short: `--ns`): Specify the namespace to run the subcommand in. If not provided, the default namespace from your profile will be used.
- `--all-namespaces` (short: `-a`): Run the subcommand across all namespaces. This option cannot be used together with `--namespace`.
