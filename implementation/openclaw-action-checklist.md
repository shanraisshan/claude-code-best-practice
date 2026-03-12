# OpenClaw Action Checklist (Immediate)

## Auth and Reliability
- [ ] Verify provider auth status (`xurl`, `gh`, etc.)
- [ ] Set default app/profile to avoid ambiguous credential context
- [ ] Add retry/backoff for bursty scheduled tasks

## Cron Hygiene
- [ ] De-burst schedules (stagger high-frequency jobs)
- [ ] Keep prompts short for scheduled jobs
- [ ] Disable jobs after repeated consecutive timeouts
- [ ] Separate timeout errors from 429 quota errors

## Cost Controls
- [ ] Minimize HEARTBEAT workload
- [ ] Route cheap periodic work to local models where possible
- [ ] Keep always-loaded context lean

## Workflow Skills
- [ ] `/techdebt` command available
- [ ] `/commit-push-pr` with approval gate
- [ ] verifier routine for completion checks
- [ ] memory-update routine after corrections

## Governance
- [ ] Explicit merge approval policy documented
- [ ] Verification-required policy documented
- [ ] Rollback notes for medium/high-risk changes
