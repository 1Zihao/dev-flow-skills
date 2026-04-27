# Workflow Overview

Dev Flow Skills splits the development flow into focused skills.

## Phase 0: Master

`dev-flow-master` classifies the request, selects the path, checks gates, and determines which focused skill owns the next stage.

## Phase 1: Planning

`dev-flow-planning` prevents premature design by requiring clarification before formal documents are written. It owns planning docs, task orchestration, task DAGs, and the executable test matrix.

## Phase 2: Git safety

`dev-flow-git` chooses the correct isolation and side-effect model: worktree, branch, shared working tree, patch-ready mode, PR mode, rollback, or conflict handling.

## Phase 3: Execution

`dev-flow-execution` keeps implementation moving until all planned tasks settle. It owns runtime orchestration state, sub-agent settlement, dynamic replanning, and recovery.

## Phase 4: Acceptance

`dev-flow-acceptance` collects verification evidence and decides whether the change is ready. It produces the delivery report.

## Requirement changes during execution

If the user's requirement or goal changes during execution, the agent must return to planning before continuing implementation. The task orchestration and test matrix must be updated and confirmed before execution resumes.
