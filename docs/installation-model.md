# Installation Model

Dev Flow Skills is designed around three installation modes.

## 1. Global install

Global install is the recommended default.

```bash
dev-flow install --global
```

Target:

```text
~/.opencode/
```

Use this for personal agent workflows that should be available across all projects.

## 2. Project-local install

Project-local install writes the package into the current repository.

```bash
dev-flow install
```

Target:

```text
./.opencode/
```

Use this when a team wants to pin, review, customize, and commit the workflow with the repository.

## 3. Agent install

Agent install is not a separate file layout. It is a set of instructions for an AI coding agent to choose the correct scope, install safely, avoid overwriting local changes, and verify the result.

See `install/agent-install.md`.

## Resolution order

Recommended resolution order:

1. Project-local `.opencode`
2. Global `~/.opencode`
3. Remote installation instructions

This allows global defaults plus project-specific overrides.
