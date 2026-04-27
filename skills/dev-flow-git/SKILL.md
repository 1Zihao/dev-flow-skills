---
name: dev-flow-git
description: Use when dev-flow must choose or apply Git isolation, commits, PRs, patch-ready output, conflict handling, rollback, branch cleanup, or side-effect permissions.
---

# dev-flow-git

Owns Git isolation, Git integration mode, side-effect permissions, rollback, conflict handling, and cleanup for dev-flow.

## Phase 2 Git Gate Inputs

Before Phase 3, resolve:

### Isolation Mode

- `worktree mode`: each parallel task uses a dedicated worktree and `task/<task-id>-<short-description>` branch.
- `branch-only serial mode`: current working tree branches only; implementation writes are serial only; effective writer cap = 1.
- `shared-working-tree serial agent mode`: no extra worktree and no extra local branch; task agents may directly modify the current working tree, but only one writing agent may run at a time and each task must settle before the next writing agent starts.
- `shared-worktree patch mode`: multiple agents may work in parallel without worktrees, but they must not write to the shared working tree. They produce patch-ready outputs, implementation plans, or diffs; the main agent applies them serially in the local working tree.

If any batch runs 2+ writing agents concurrently, `worktree mode` is mandatory. If the user refuses worktrees and branches but still wants agents to directly implement in the current local checkout, use `shared-working-tree serial agent mode`. If the user wants multiple agents active at once without worktrees, use `shared-worktree patch mode` instead of allowing concurrent writes.

### Integration Mode

- `PR/review/merge mode`: task branch → commit → PR → review → merge.
- `solo-dev direct-commit mode`: local commit with equivalent self-review; no push/merge unless explicitly approved.
- `patch-ready mode`: no stage/commit/push/PR/merge; report patch/diff-ready status and verification evidence.

Default to `patch-ready mode` when Git side effects are not explicitly authorized or environment support is missing.

## Capability and Permission Check

Before selecting any mode that creates commits, pushes branches, opens PRs, or merges, verify:

- working tree cleanliness and current branch
- remote availability and target integration branch
- push/PR tooling availability
- explicit user authorization for commits and remote side effects
- repository policy constraints such as protected branches or required checks, if discoverable

If any required capability or authorization is missing, use `patch-ready mode` and state that implementation/tests can continue without commit/PR/merge automation.

## Worktree Mode Rules

- Create/enter a dedicated worktree for each parallel task.
- Do implementation and verification inside that worktree.
- Stage, commit, PR, review, or merge only if selected integration mode allows it.
- Never share one working tree between concurrent task agents.

## Branch-Only Rules

- Create a feature branch in current working tree.
- Run serially only.
- Never execute two task agents concurrently in the same working tree.

## Shared-Working-Tree Serial Agent Rules

Use this when the user wants sub-agents to directly modify the current local checkout, without creating worktrees or local task branches.

Rules:

1. No additional worktree is created.
2. No additional local branch is required unless the user explicitly asks for one.
3. Only one writing task agent may run at a time.
4. The writing task agent may edit files directly in the current working tree.
5. The task must settle and the main agent must verify diagnostics/tests before another writing task agent starts.
6. The main agent must reconcile actual Git/filesystem state after each task and update Runtime Orchestration State.
7. If the working tree contains unrelated user changes, the main agent must preserve them and avoid staging/committing unless explicitly authorized.
8. Parallel analysis-only agents may run, but they must not write files while a writing task agent is active.

## Integration Steps

### PR/review/merge mode

1. Confirm correct branch/worktree.
2. Stage and commit changes.
3. Open PR targeting integration branch.
4. Request review or perform equivalent self-review when external review tooling is unavailable.
5. Merge only after review passes and required checks allow it.

### Solo-dev direct-commit mode

1. Confirm correct approved branch/worktree.
2. Stage and commit changes.
3. Perform and record self-review.
4. Do not push or merge unless explicitly approved.

### Patch-ready mode

1. Do not stage, commit, push, open PR, or merge.
2. Report changed files, verification evidence, and patch/diff-ready status.
3. Leave integration decision to main agent/user after aggregation or later explicit Git gate.

### Shared-worktree patch mode

Use this when the user wants multiple agents but does not want worktrees.

Rules:

1. Sub-agents must not edit files in the shared working tree.
2. Sub-agents may read files, analyze, design tests, propose implementation steps, and produce patch/diff-ready output.
3. Sub-agents must include expected changed files, patch content or precise edit instructions, required diagnostics/tests, and risk notes.
4. The main agent is the only writer to the shared working tree.
5. The main agent applies patch outputs one at a time, rechecks actual file state before each apply, resolves overlap, then runs required diagnostics/tests.
6. If two patch outputs touch overlapping files or symbols, the main agent serializes them and treats the second as needing rebase/reconciliation against the updated local state.
7. A sub-agent patch is not considered complete until the main agent has applied it, verified it, and updated Runtime Orchestration State.

Every completed task must have explicit integration state: merged, committed, PR opened, direct-commit complete, shared-working-tree-applied, patch-ready, or applied-from-shared-worktree-patch.

## Conflict Handling

When conflict appears:

1. Detect conflicting files and source tasks.
2. Attempt safe auto-merge on a temporary merge branch only if allowed by current Git mode.
3. If auto-merge succeeds, continue and report it.
4. If auto-merge fails, hard-stop for manual resolution.
5. After manual resolution, re-run affected verification if resolution changed implementation.

Do not silently block a batch on unresolved conflict.

## Rollback Safety

Rollback after committed work requires safety check:

- verify current branch/worktree
- list commits and files affected
- obtain explicit approval for destructive actions
- prefer `git revert` for pushed, reviewed, merged, or non-isolated commits
- use `git reset --hard` only for unpushed isolated task branch/worktree after confirming no unrelated changes exist

## Cleanup

Delete `task/*` branches only after verifying they are merged or no longer needed. Do not delete patch-ready or unmerged work without explicit approval.

Never force-push, hard-reset shared work, amend pushed commits, bypass hooks, or perform destructive Git actions unless explicitly requested and safe under repo policy.

## Required Signal

Emit `git_safe` with: isolation mode, integration mode, writer concurrency limit, allowed side effects, forbidden side effects, capability/permission check result, rollback constraints, and unresolved Git blockers.
