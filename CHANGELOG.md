# Changelog

## [0.1.7] - 2026-04-27

### Changed

- Make the AI-agent installation prompt platform-neutral and move platform-specific routing into `install/agent-install.md`.

## [0.1.6] - 2026-04-27

### Changed

- Keep README command list platform-neutral and move platform-specific command details to platform guides.

## [0.1.5] - 2026-04-27

### Changed

- Make the README AI-agent installation section a directly copy-pasteable prompt.

## [0.1.4] - 2026-04-27

### Changed

- Move platform-specific installation detail out of README and into platform guides.
- Add a copy-paste AI agent prompt to `install/agent-install.md`.
- Expand OpenCode installation details in `install/opencode.md`.

## [0.1.3] - 2026-04-27

### Changed

- Improve README with badges, workflow diagram, copy-paste AI agent install prompt, and Codex CLI commands.

## [0.1.2] - 2026-04-27

### Added

- Add Codex plugin metadata in `.codex-plugin/plugin.json`.
- Add Codex native skill discovery instructions in `.codex/INSTALL.md`.
- Add top-level `skills/` directory for Codex-compatible skill discovery.
- Add `install-codex`, `update-codex`, and `doctor-codex` CLI commands.

## [0.1.1] - 2026-04-27

### Changed

- Mark npm installation as the recommended path now that the package is published.
- Add repository, bugs, and homepage metadata to `package.json`.

## [0.1.0] - 2026-04-27

### Added

- Initial Dev Flow Skills package structure.
- Global and project-local install model.
- `/dev-flow` OpenCode command entrypoint.
- Five focused skills: governor, planning, execution, git, and acceptance.
- CLI commands for install, update, doctor, uninstall, and version.
- Manifest checksum protection for safe updates.
- Manual, Agent, and OpenCode installation docs.
