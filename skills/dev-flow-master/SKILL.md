---
name: dev-flow-master
description: Use when a development request needs governed routing, planning gates, execution coordination, Git safety boundaries, and final acceptance decisions.
---

# dev-flow-master

`dev-flow-master` is the global dispatcher for the governed development flow. It owns entry routing, complexity classification, stage order, phase gates, state signals, and final stage authorization.

All user-facing replies in this governed flow must be written in Chinese. Command names, file paths, artifact IDs, and literal CLI commands may remain in their original language.

## Core Skill Boundaries

| Area | Skill | Owns |
|---|---|---|
| Global dispatch | `dev-flow-master` | classification, route selection, phase gates, signal checks, progress routing |
| Planning | `dev-flow-planning` | four Chinese docs, review cadence, design sufficiency, task DAG, `task-orchestration.md`, Executable Test Matrix |
| Execution | `dev-flow-execution` | Phase 3 run-to-completion, task settlement, Runtime Orchestration State, dynamic replanning, failure handling, progress updates |
| Git safety | `dev-flow-git` | worktree/branch modes, PR/direct/patch-ready modes, permissions, conflicts, rollback, cleanup |
| Acceptance | `dev-flow-acceptance` | final regression, quality evidence, delivery report, acceptance readiness |

Required loading rule: before stage-specific work, load the skill that owns that stage. If areas overlap, the owner in the table above is authoritative. In particular, Git side effects are owned by `dev-flow-git`; execution may reference Git mode but must not invent Git permissions.

## Complexity Classification

Classify before forcing a heavy path. Classification is an internal master decision, not a separate user gate.

| Dimension | Lightweight signal | Medium signal | Heavyweight signal |
|---|---|---|---|
| Files / modules | one known file or one narrow artifact | 2–5 files or 2–3 bounded modules | new module, cross-cutting module set, or unclear file spread |
| Behavior change | no externally visible behavior change, or tiny copy/config change | bounded feature or behavior change with clear acceptance criteria | new workflow, major behavior redesign, or multiple user/system journeys |
| Data / API / protocol | no schema/API/protocol contract change | small API/data shape change with limited consumers | database migration, public API/protocol, SDK, webhook, MQ, or compatibility impact |
| Security / permissions | none | localized validation or permission check | auth, authorization, secrets, external boundary, abuse prevention, or sensitive data |
| UI / runtime surface | none or tiny static text/style change | bounded UI flow or component behavior | multi-page flow, responsive/accessibility-critical UI, upload/download, browser runtime risk |
| Test surface | existing obvious related tests only | new unit/integration tests or limited E2E | multi-layer regression, performance/security/browser/API contract testing |
| Rollback / release risk | trivial revert | local rollback possible | migration, deployment, rollback, compatibility, or release sequencing required |

Routing rule:

- If every applicable dimension is lightweight, classify as **lightweight**.
- If any dimension is heavyweight, classify as **heavyweight** unless existing change/spec context proves the risk is already bounded.
- Otherwise classify as **medium**.
- If key information is unknown, inspect repo/spec context first. If still unknown and uncertainty affects safety, choose the higher-risk classification rather than under-governing.

Path mapping:

- **Lightweight** → built-in opsx/OpenSpec artifact path; do not generate the four governed Chinese docs unless reclassified.
- **Medium** → governed planning path; load `dev-flow-planning` for docs and orchestration.
- **Heavyweight** → governed planning path with explicit risk, rollback/release, integration-test, and quality-evidence treatment before execution.

Required routing output to the user:

```text
分类：<轻量|中量|重量>
依据：<2-4 个关键维度>
路径：<opsx/OpenSpec artifact | governed planning path>
下一步：<具体阶段>
```

## State and Gate Signal Protocol

Stage skills may perform stage-specific work, but the master is the only component allowed to declare a governed stage complete.

| Signal | Produced by | Required evidence |
|---|---|---|
| `routing_decided` | `dev-flow-master` | classification, key dimensions, chosen path, next stage |
| `documentation_start_approved` | `dev-flow-planning` | user confirmed document drafting should begin, clarification answers or accepted unknowns, review mode |
| `planning_docs_ready` | `dev-flow-planning` | four document paths, requirement variant, review mode, design sufficiency result, known risks |
| `task_orchestration_ready` | `dev-flow-planning` | `task-orchestration.md`, DAG/batches, Executable Test Matrix, automation readiness result |
| `git_safe` | `dev-flow-git` | isolation mode, integration mode, permission/capability result, side-effect boundary |
| `execution_settled` | `dev-flow-execution` | batch/task status, Runtime Orchestration State summary, replan history, test/diagnostic evidence, unresolved blockers |
| `acceptance_ready` | `dev-flow-acceptance` | final test results, quality evidence, delivery report path, Git/patch states, unresolved follow-ups |

Gate rules:

- Do not enter governed planning without `routing_decided` choosing the governed path.
- Do not draft the four planning documents without `documentation_start_approved`.
- Do not present Phase 1 Gate as ready without `planning_docs_ready`.
- Do not present Phase 2 Gate as ready without `task_orchestration_ready` and `git_safe`.
- Do not enter acceptance until execution reports all batches completed, deferred, or replanned under `execution_settled`.
- Do not report `ready-to-report` without `acceptance_ready`.

If a signal is missing, stale, or contradicted by actual Git/filesystem/task state, route back to the owning skill for repair before advancing. Chat memory is never sufficient evidence.

## When to Use

Use this skill when the user asks for governed development process, for example:

- “先按规范走一下”
- “先做需求分析/设计”
- “先别写代码，先把流程定下来”
- “按 OpenSpec 流程来”
- “先出文档再开发”
- “这次要不要走完整流程？”
- “看一下 dev flow / 按 dev flow 执行”

Do not use it for a tiny one-file fix, a simple explanation request, or direct continuation of an already approved stage where a more specific skill applies.

## Stage Ownership Matrix

| Stage / Activity | Primary owner | Sub-agent allowed? | Required skill / constraint |
|---|---|---|---|
| Existing change/spec check | Main agent | No | Routing judgment only |
| Complexity routing | Main agent | No | Master internal classification |
| Planning path selection | Main agent | No | Master internal routing |
| Review-mode decision | Main agent + user | No | `dev-flow-planning` |
| Brainstorming handoff | Main agent coordinating brainstorming | Yes, only through required brainstorming path | `dev-flow-planning` |
| Four Chinese docs | Main agent | No | `dev-flow-planning`; must persist local files |
| Phase 1 gate | Main agent + user | No | Mandatory explicit approval |
| Task orchestration | Main agent | No | `dev-flow-planning`; write DAG/test matrix |
| Phase 2 gate | Main agent + user | No | Mandatory explicit approval; resolve Git modes via `dev-flow-git` |
| Phase 3 execution | Main agent + task agents | Yes | `dev-flow-execution`; task agents implement only assigned scope |
| Git operations | Main agent / task agent within approved mode | Yes within task scope | `dev-flow-git`; no unauthorized side effects |
| Acceptance | Main agent | No | `dev-flow-acceptance` |
| Completion gate | Main agent | No | `dev-flow-acceptance` evidence + master final decision |

Ownership rules:

- If a stage is marked “Main agent,” do not delegate its governance decision to a task sub-agent.
- A task sub-agent may implement only its assigned task; it must not rewrite orchestration, alter gates, or change dependency status.
- Dynamic replanning is execution-internal and owned by `dev-flow-execution`; it is not a user-facing stage.

## Flow Structure

```text
Entry
  dev-flow-master: existing context check + classification + route

Planning
  dev-flow-planning: pre-document clarification + user approval → four docs → [Phase 1 Gate] → task orchestration/test matrix
  dev-flow-git: Git mode proposal before Phase 2 Gate
  → [Phase 2 Gate]

Execution
  dev-flow-execution ↔ dev-flow-git
  continuous execution + dynamic replanning until hard-stop or completion

Acceptance
  dev-flow-acceptance: final checks + delivery report + readiness
```

A phase gate is never a soft stop. Phase 1 Gate and Phase 2 Gate require explicit user consent. After Phase 2 Gate is cleared, Phase 3 is run-to-completion except for hard-stop conditions defined in `dev-flow-execution` and `dev-flow-git`.

## Stage Order

1. Existing change/spec check
2. Complexity routing and path selection — master internal
3. If lightweight: route to opsx/OpenSpec artifact path
4. If medium/heavyweight: load `dev-flow-planning`
5. Pre-document clarification and documentation-start approval — `dev-flow-planning`
6. Phase 1 docs and Phase 1 Gate — `dev-flow-planning`
7. Task orchestration and Executable Test Matrix — `dev-flow-planning`
8. Git mode preparation — `dev-flow-git`
9. Phase 2 Gate — explicit user approval before execution
10. TDD execution and dynamic replanning — `dev-flow-execution`; Git decisions through `dev-flow-git`
11. Acceptance — `dev-flow-acceptance`
12. Completion gate — master checks acceptance evidence and reports final state

Continue-by-default rule:

- Stage completion is an internal control point, not a default user-facing stop point.
- If the next stage is executable without new user input, continue automatically.
- Exceptions: Phase 1 Gate and Phase 2 Gate always require explicit user approval.
- During Phase 3, never stop after a task, batch, progress update, patch-ready output, or automatic replan if execution can safely continue.

## Existing Change / Spec Check

Before opening a new governed flow, check for relevant existing OpenSpec/change/spec context:

- active change
- relevant proposal/design/tasks/spec
- signals that the request continues an existing thread

If relevant context exists, prefer continuing or updating it instead of blindly creating a new path.

## Phase Gates

### Phase 1 Gate

After `dev-flow-planning` produces and persists the four planning documents, stop and present:

- generated document paths
- requirement variant: product or software
- review mode applied
- design sufficiency result
- accepted known risks
- next step: task orchestration

Do not enter task orchestration until the user explicitly approves with “同意”, “开始”, “继续”, “proceed”, “go ahead”, “实施”, or equivalent.

### Phase 2 Gate

After `dev-flow-planning` writes `task-orchestration.md` and `dev-flow-git` emits `git_safe`, stop and present:

- task count, batch count, execution order, key dependencies
- max concurrent agent cap
- Git isolation mode, integration mode, and writer concurrency limit
- automation readiness status and blockers

Do not enter Phase 3 until the user explicitly says to start execution, for example “开始执行”, “执行”, “start”, “go”, or equivalent.

## Completion Gate

The final state is one of:

- `not-ready`: earlier gate unresolved, artifact missing, blocker unresolved, or verification incomplete
- `ready-for-review`: artifacts/drafts exist but completion evidence is incomplete
- `ready-to-report`: acceptance evidence proves the governed workflow reached its final state

The master may report `ready-to-report` only after `dev-flow-acceptance` confirms:

1. required planning docs exist as files
2. Phase 1 and Phase 2 gates were explicitly cleared
3. `task-orchestration.md`, `progress.md`, and `delivery-report.md` exist where applicable
4. all DAG tasks are completed, explicitly deferred, or dynamically replanned under execution rules
5. task, batch, and final Executable Test Matrix checks have passed or were explicitly accepted as deferred scope
6. Git integration state is explicit for every task: merged, committed, PR opened, direct-commit complete, or patch-ready
7. applicable quality-gate evidence is recorded
8. no unresolved blocker remains

For avoidance of doubt: a document or plan that only appeared in chat does not satisfy a persisted artifact requirement.

## Progress Queries

When the user asks “进度怎么样 / 状态 / 到哪了 / 还剩多少”, read `progress.md` if it exists, reconcile it with actual state, and answer in Chinese. If the workflow is still before `progress.md` creation, summarize the current stage verbally.

## Context Recovery Protocol

When a dev-flow session resumes, context was compacted, a new session starts, or the agent is unsure whether memory is stale, do not continue from chat memory.

Before any new planning, execution, Git, or acceptance action, reload or re-read:

1. `dev-flow-master`
2. the current phase skill: `dev-flow-planning`, `dev-flow-execution`, `dev-flow-git`, or `dev-flow-acceptance`
3. canonical `progress.md` if present
4. canonical `task-orchestration.md` if present
5. canonical `test-plan.md` if present
6. relevant requirement/design docs if planning or requirement-change state is involved
7. actual Git/filesystem state

Recovery rules:

- If `progress.md` says a requirement change, stale task, failed task, skipped task, rollback, pause, or gate re-entry is pending, resume at that recovery point instead of dispatching new work.
- If `task-orchestration.md` and `progress.md` disagree, route to the current phase owner to reconcile before continuing.
- If actual Git/filesystem state contradicts documents, actual state is highest priority and must be reconciled into `progress.md` before continuing.
- Chat memory is lowest priority and must not override persisted artifacts or actual state.

## Guardrails

- Do not replace opsx, OpenSpec, or superpowers; route to them when they own the work.
- Do not force the heavy path for every request; use the classification matrix.
- Do not advance past Phase 1 Gate or Phase 2 Gate without explicit user approval.
- Do not dispatch execution agents before Phase 2 Gate is cleared.
- Do not claim completion before `dev-flow-acceptance` evidence satisfies the Completion Gate.
- Do not perform external side effects, destructive Git actions, pushes, PRs, merges, production operations, or paid-service actions without the authorization rules in `dev-flow-git`.
