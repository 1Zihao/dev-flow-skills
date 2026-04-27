# OpenCode Integration

Dev Flow Skills installs an OpenCode command plus focused skills.

## Command

```text
.opencode/command/dev-flow.md
```

The command is intentionally thin. It enters `dev-flow-governor`, which owns routing, classification, phase gates, and focused skill selection.

## Skills

```text
.opencode/skills/dev-flow-governor/
.opencode/skills/dev-flow-planning/
.opencode/skills/dev-flow-execution/
.opencode/skills/dev-flow-git/
.opencode/skills/dev-flow-acceptance/
```

## Global versus project-local

Use global install for personal default behavior across projects. Use project-local install when the repository should pin or customize the workflow.

Recommended resolution order:

1. project-local `.opencode`
2. global `~/.opencode`
3. remote install instructions

## Project shim option

If an OpenCode environment does not resolve global commands, run project-local install or create a project command shim that points to the global skill package.
