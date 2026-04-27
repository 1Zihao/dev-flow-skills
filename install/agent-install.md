# Agent Installation Instructions

You are installing Dev Flow Skills for a user.

## Default decision

Install globally unless the user explicitly asks for project-local installation.

Global installation avoids copying the same workflow into every project.

## Install targets

Global target:

```text
~/.opencode/
```

Project target:

```text
./.opencode/
```

## Required behavior

1. Determine the target scope.
2. Install `command/dev-flow.md` and all `skills/dev-flow-*` directories.
3. Preserve existing modified files.
4. Write or update `dev-flow-manifest.json` with version and checksums.
5. Run `dev-flow doctor` for the selected scope if the CLI is available.
6. Report exactly what changed and what was verified.

## Commands

Recommended global install:

```bash
npm install -g dev-flow-skills
dev-flow install --global
dev-flow doctor --global
```

Project-local install:

```bash
dev-flow install
dev-flow doctor
```

Update global install:

```bash
npm install -g dev-flow-skills@latest
dev-flow update --global
dev-flow doctor --global
```

## Do not

- Do not overwrite local modifications unless the user explicitly asks for `--force`.
- Do not commit installed files unless the user explicitly asks.
- Do not assume project-local installation is required just because the user is inside a repository.
- Do not stop after copying files; run doctor or perform an equivalent structural check.
