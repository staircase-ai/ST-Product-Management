# Insight Export Specifications

**Status:** Engineering Handoff
**Customer:** Nielsen
**Owner:** Brady Bluhm
**Last Updated:** December 10, 2025

---

## Overview

This is **Phase 1** of the Insight Export epic — the foundation for MCP and API work.

```
INSIGHT EXPORT EPIC (Full Vision)
├── PHASE 1: Data Export Foundation ← WE ARE HERE
│   └── Reliable scheduled exports to data warehouse
├── PHASE 2: MCP Integration
│   └── AI-powered summaries and intelligent delivery
└── PHASE 3: API / Hooks
    └── Real-time event delivery and integrations
```

**Why this matters:** Without reliable data exports, we can't build the intelligence layer on top.

---

## Export Table Specifications

PM has organized ~260 fields into 10 export table specifications. These define the recommended structure for data analyst teams to work with downstream.

| Table | Grain | Columns | Spec |
|-------|-------|---------|------|
| Account Core | Account | 78 | [account-core-spec.md](export-table-specs/account-core-spec.md) |
| Account Communication Stats | Account | 52 | [account-communication-stats-spec.md](export-table-specs/account-communication-stats-spec.md) |
| Account Owner/Team | Account | 27 | [account-owner-team-spec.md](export-table-specs/account-owner-team-spec.md) |
| Stakeholder Fact | Stakeholder | 41 | [stakeholder-fact-spec.md](export-table-specs/stakeholder-fact-spec.md) |
| Account-Topic Fact | Account × Topic | 15 | [account-topic-fact-spec.md](export-table-specs/account-topic-fact-spec.md) |
| Lifecycle Event History | Account × Event | 9 | [lifecycle-event-history-spec.md](export-table-specs/lifecycle-event-history-spec.md) |
| Insight Snapshot | Account × Insight | 8 | [insight-snapshot-spec.md](export-table-specs/insight-snapshot-spec.md) |
| Meeting Summary | Meeting | 12 | [meeting-summary-spec.md](export-table-specs/meeting-summary-spec.md) |
| Topic Dimension | Topic | 8 | [topic-dimension-spec.md](export-table-specs/topic-dimension-spec.md) |
| Team Dimension | Team Member | 14 | [team-dimension-spec.md](export-table-specs/team-dimension-spec.md) |

**Total:** ~264 columns across 10 tables

---

## Reference Files

| Purpose | File |
|---------|------|
| **Data Dictionary** | [data-dictionary.csv](data-dictionary.csv) — Complete field mapping (~260 rows) |
| **Architecture Decision** | [insight-delivery-architecture.md](decisions/insight-delivery-architecture.md) — Hooks vs. Exports |

---

## Current Issue

Nielsen needs reliable data exports to feed their 13-product intelligence system. Current report builder is returning 400 errors when building complex exports.

**Acceptance Criteria:**
- [ ] Investigate 400 error when building Account Core export
- [ ] Identify any columns in specs that need engineering work
- [ ] Build working scheduled export for Account Core table
- [ ] Document delivery options (S3 bucket vs email)
- [ ] Confirm Nielsen can receive export successfully

---

## Questions for Engineering

1. What's causing the 400 error on complex reports?
2. Are there column limits we're hitting?
3. What's the recommended path for S3 delivery to Nielsen?

---

*Contact: Brady Bluhm (Product)*
