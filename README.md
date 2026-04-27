# Dev Flow Skills

Governed development-flow skills for AI coding agents.

```text
clarify -> plan -> orchestrate -> execute -> accept
```

Dev Flow Skills turns `/dev-flow` into a disciplined software-delivery workflow. It is designed for agents that need to clarify requirements, write real planning documents, build an executable task plan, coordinate implementation, handle Git safely, and finish with acceptance evidence instead of a chat-only summary.

## Why this exists

Most coding-agent failures are workflow failures:

- the agent starts coding before clarifying the requirement
- the agent writes plans but does not turn them into executable tasks
- execution stops after one task instead of continuing through the whole plan
- requirement changes are applied directly to code without updating docs and orchestration
- sub-agents fail or drift while the main agent reports success too early
- Git side effects happen without an explicit safety boundary

Dev Flow Skills adds gates, handoffs, runtime state, and final acceptance checks so the agent keeps moving without skipping the decisions that must remain user-owned.

## Quick start

### Recommended today: install from GitHub

Until the npm package is published, install directly from the GitHub repository:

```bash
git clone https://github.com/1Zihao/dev-flow-skills.git
cd dev-flow-skills
npm install -g .
dev-flow install --global
dev-flow doctor --global
```

Update to the latest GitHub version:

```bash
cd dev-flow-skills
git pull
npm install -g .
dev-flow update --global
```

### Future npm install

Install once and use `/dev-flow` in any project.

```bash
npm install -g dev-flow-skills
dev-flow install --global
```

Update to the latest version:

```bash
npm install -g dev-flow-skills@latest
dev-flow update --global
```

The npm commands become the recommended path after the package is published to npm.

Check the install:

```bash
dev-flow doctor --global
```

### Optional: project-local install

Use this when a repository should pin and commit its workflow.

```bash
cd your-project
dev-flow install
```

Project-local installs write to `./.opencode/` and override global installs for that project.

### Install with an AI agent

Ask your agent to follow:

```text
https://raw.githubusercontent.com/1Zihao/dev-flow-skills/main/install/agent-install.md
```

Default agent instruction: install globally unless the user asks for project-local installation, and never overwrite modified files without preserving the local copy.

## What gets installed

```text
.opencode/
  command/
    dev-flow.md
  skills/
    dev-flow-governor/
    dev-flow-planning/
    dev-flow-execution/
    dev-flow-git/
    dev-flow-acceptance/
```

## Skill map

| Skill | Responsibility |
| --- | --- |
| `dev-flow-governor` | Entry routing, classification, phase gates, and recovery signals |
| `dev-flow-planning` | Clarification before docs, formal planning docs, task DAG, and test matrix |
| `dev-flow-execution` | Continuous execution, task settlement, dynamic replanning, and runtime state |
| `dev-flow-git` | Worktree, shared-working-tree, branch, PR, patch, rollback, and conflict safety |
| `dev-flow-acceptance` | Final verification, quality evidence, and delivery report |

## Resolution order

Dev Flow Skills should be resolved in this order:

1. Project-local `.opencode/command` and `.opencode/skills`
2. Global `~/.opencode/command` and `~/.opencode/skills`
3. Remote install instructions

This lets one global installation serve most projects while still allowing individual repositories to pin or customize the workflow.

## Typical flow

```text
User: /dev-flow 给订单后台增加退款审批流，完整走 dev flow

Agent:
1. Classifies the work as governed medium/heavy work.
2. Enters planning mode.
3. Asks required clarification questions before writing documents.
4. Writes requirement/design/test documents after user confirmation.
5. Builds task orchestration and an executable test matrix.
6. Selects a Git strategy.
7. Executes continuously until all planned tasks settle.
8. Replans if requirements change or execution invalidates the plan.
9. Runs final acceptance and writes delivery evidence.
```

## Generated artifacts

For governed work, the flow is designed to produce durable project artifacts such as:

- `product-requirement-analysis.md`
- `software-requirement-analysis.md`
- `high-level-design.md`
- `detailed-design.md`
- `test-plan.md`
- `task-orchestration.md`
- runtime orchestration state
- `delivery-report.md`

Exact paths are project-specific and should be decided during planning.

## CLI commands

```bash
dev-flow install
dev-flow install --global
dev-flow update
dev-flow update --global
dev-flow doctor
dev-flow doctor --global
dev-flow uninstall
dev-flow uninstall --global
dev-flow version
```

Use `--dry-run` to preview file operations and `--force` to overwrite modified installed files intentionally.

## Safety model

- User confirmation is required before starting formal planning documents when clarification is incomplete.
- Requirement changes during execution must return to planning before code changes continue.
- Shared working-tree writes must be serialized.
- Parallel no-worktree mode should use patch generation plus main-agent serial apply.
- Local modifications are protected by manifest checksums during update.
- Final success requires verification evidence, not only agent self-reporting.

## Status

This package is intended to be copied into its own GitHub repository. The Agent install URL points to the `1Zihao/dev-flow-skills` repository.
