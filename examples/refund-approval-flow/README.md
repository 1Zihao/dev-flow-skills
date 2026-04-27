# Example: Refund Approval Flow

This example shows the intended shape of a governed `/dev-flow` run.

## User request

```text
/dev-flow 给后台订单模块增加退款审批流，按完整 dev flow 执行
```

## Expected agent behavior

1. Classify the request as governed medium/heavy work.
2. Ask clarification questions before writing documents:
   - approval roles
   - number of approval levels
   - existing order/refund module boundaries
   - required audit trail
   - notification requirements
   - test expectations
   - deployment constraints
3. Wait for confirmation before writing planning documents.
4. Generate requirement, design, and test documents.
5. Generate task orchestration and executable test matrix.
6. Select Git strategy.
7. Execute continuously until all planned tasks settle.
8. Run acceptance and write a delivery report.

## Important constraint

If the requirement changes, the agent must update the planning artifacts and task orchestration before continuing code changes.
