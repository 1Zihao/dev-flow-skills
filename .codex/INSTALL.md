# Installing Dev Flow Skills for Codex

Codex discovers skills through the native skill discovery directory:

```text
~/.agents/skills/
```

This package includes a Codex plugin manifest at `.codex-plugin/plugin.json` and a top-level `skills/` directory for Codex-compatible skill discovery.

## Codex App

If the package appears in the Codex plugin marketplace, install it from the Plugins sidebar.

Until marketplace listing is available, use the manual install below.

## Manual install

After installing the npm package, link the bundled skills into Codex's discovery directory:

```bash
npm install -g dev-flow-skills
dev-flow install-codex
dev-flow doctor-codex
```

Then restart Codex so it discovers the skills.

## Manual Git install

Alternatively, clone the repository and symlink its skills into Codex's discovery directory:

```bash
git clone https://github.com/1Zihao/dev-flow-skills.git ~/.codex/dev-flow-skills
mkdir -p ~/.agents/skills
ln -s ~/.codex/dev-flow-skills/skills ~/.agents/skills/dev-flow-skills
```

Then restart Codex so it discovers the skills.

## Install from npm package contents

The CLI commands above are preferred because they locate the global npm package automatically from the running `dev-flow` executable.

## Using the workflow in Codex

Ask Codex to use the governor skill explicitly:

```text
Use the dev-flow-governor skill for this task and follow the dev-flow planning, execution, git, and acceptance workflow.
```

Codex skill discovery is not the same as OpenCode slash-command discovery. The OpenCode `/dev-flow` command remains available through `.opencode/command/dev-flow.md`; Codex primarily discovers skills from `~/.agents/skills`.

## Updating

If installed by Git clone:

```bash
cd ~/.codex/dev-flow-skills
git pull
```

If installed by npm:

```bash
npm install -g dev-flow-skills@latest
dev-flow update-codex
```

Restart Codex after updating.

## Uninstalling

```bash
rm ~/.agents/skills/dev-flow-skills
```

Optionally delete the clone:

```bash
rm -rf ~/.codex/dev-flow-skills
```
