# Architectural Decisions

## [2026-02-13T08:40:00] Execution Strategy
- Wave 1: Task 1 (shared data + #9 fix) — sequential, unblocks everything
- Wave 2: Tasks 3-11 (9 variants) — parallel execution
- Wave 3: SKIP Task 12 (user QA) — just run final build + commit
