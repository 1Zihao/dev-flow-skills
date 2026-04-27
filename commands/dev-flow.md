---
description: Run the governed Dev Flow workflow for a development task.
---

# Dev Flow

Use this command as the Codex slash-command entrypoint for Dev Flow Skills.

## Workflow

1. Use the `dev-flow-master` skill to classify the request and choose the correct phase gate.
2. If planning is required, use `dev-flow-planning` before implementation and wait for required user confirmations.
3. During implementation, use `dev-flow-execution` to continue until all planned tasks settle.
4. Use `dev-flow-git` before any Git side effect such as branching, committing, PR creation, patch generation, rollback, or cleanup.
5. Before reporting completion, use `dev-flow-acceptance` to collect verification evidence and write the delivery decision.

## Rules

- Do not skip clarification, planning, orchestration, Git safety, or acceptance gates when the task requires governed flow.
- Do not treat this command as a chat-only summary. It is an execution workflow.
- If requirements change during execution, return to planning before continuing implementation.
- If local files would be overwritten, preserve modified content unless the user explicitly approves a force operation.

## User request

Apply the workflow above to the user's current request and any arguments supplied after `/dev-flow`.
