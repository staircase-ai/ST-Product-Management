# Nielsen Report Test — Split Export Specs

**Purpose:** Break down large export specs into smaller reports that work reliably in Staircase report builder
**Problem:** Account-core (78 cols) causing 400 errors — likely hitting column/join limits
**Solution:** 19 smaller reports (each <30 columns) that join in data lake via `account_id`

---

## Quick Reference

| # | Report | Cols | Grain | Status |
|---|--------|------|-------|--------|
| 01 | team-dimension | 14 | Team Member | Unchanged |
| 02 | topic-dimension | 8 | Topic | Unchanged |
| 03 | account-identity | ~20 | Account | Split from account-core |
| 04 | account-health | 14 | Account | Split from account-core |
| 05 | account-email-stats | 19 | Account | Split from comm-stats |
| 06 | account-meeting-stats | 13 | Account | Split from comm-stats |
| 07 | account-owner-team | 28 | Account | Unchanged |
| 08 | account-insights | 21 | Account | Split from account-core |
| 09 | account-lifecycle-dates | 17 | Account | Split from account-core |
| 10 | account-activity-sentiment | 16 | Account | Split from account-core |
| 11 | account-chat-stats | 17 | Account | Split from comm-stats |
| 12 | account-ticket-effort | 16 | Account | Split from comm-stats |
| 13 | account-ai-summaries | 10 | Account | Split from account-core |
| 14 | stakeholder-fact | 42 | Stakeholder | Unchanged |
| 15 | account-topic-fact | 16 | Account × Topic | Unchanged |
| 16 | topic-summary | 16 | Topic | **NEW** |
| 17 | lifecycle-event-history | 11 | Account × Event | Unchanged |
| 18 | insight-snapshot | 10 | Account × Insight | Unchanged |
| 19 | meeting-summary | 13 | Meeting | Unchanged |

---

## Build Order for Testing

Start with simplest reports to validate report builder works, then add complexity:

**Phase 1: Dimensions (standalone, no joins)**
1. team-dimension — Users table only
2. topic-dimension — Topic tables only

**Phase 2: Account Foundation (simple joins)**
3. account-identity — customer + tier + journey tables
4. account-health — computed health scores

**Phase 3: Single-Source Channel Stats**
5. account-email-stats — email_prop table
6. account-meeting-stats — calendar_event_prop table

**Phase 4: Moderate Complexity**
7. account-owner-team — owner + communications
8. account-insights — insight table pivot
9. account-lifecycle-dates — computed timestamps
10. account-activity-sentiment — aggregations

**Phase 5: Computed Channels**
11. account-chat-stats — computed
12. account-ticket-effort — computed

**Phase 6: TEXT Fields**
13. account-ai-summaries — test memory impact

**Phase 7: Multi-Grain Tables**
14. stakeholder-fact — different grain (person level)
15. account-topic-fact — bridge table
16. topic-summary — aggregated topic view
17. lifecycle-event-history — event rows
18. insight-snapshot — snapshot rows
19. meeting-summary — meeting rows

---

## Data Lake Join Strategy

All account-grain reports share `account_id` as the join key.

```
┌─────────────────────────────────────────────────────────────┐
│                    ACCOUNT-IDENTITY                          │
│              (Foundation — all accounts join here)           │
│                   account_id + account_name                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│ account-health │  │account-insights│  │account-email  │
│ account-activity│  │lifecycle-dates │  │account-meeting│
│ account-ai-sum │  │account-owner   │  │account-chat   │
└───────────────┘  └───────────────┘  │account-ticket │
                                      └───────────────┘

DIMENSION TABLES (lookup):
┌───────────────┐  ┌───────────────┐
│team-dimension │  │topic-dimension│
│ team_member_id│  │   topic_id    │
└───────────────┘  └───────────────┘
       ▲                   ▲
       │                   │
  owner_id            topic_id
       │                   │
┌──────┴──────┐    ┌───────┴───────┐
│account-owner│    │account-topic  │
│   -team     │    │    -fact      │
└─────────────┘    │topic-summary  │
                   └───────────────┘

MULTI-GRAIN TABLES (1:many from account):
┌─────────────────────────────────────────────────────────────┐
│  stakeholder-fact    │ account_id + stakeholder_id          │
│  account-topic-fact  │ account_id + topic_id                │
│  lifecycle-event-hist│ account_id + event_type + timestamp  │
│  insight-snapshot    │ account_id + insight_type            │
│  meeting-summary     │ account_id + meeting_id              │
└─────────────────────────────────────────────────────────────┘
```

---

## Topic Architecture (3 Complementary Views)

| Report | Grain | Purpose |
|--------|-------|---------|
| **topic-dimension** | Topic | Lookup: topic hierarchy |
| **account-topic-fact** | Account × Topic | Per-account: "Account X discusses Pricing" |
| **topic-summary** | Topic (aggregated) | Portfolio: "50 accounts discuss Pricing, 60% negative" |

**topic-summary includes parent rollups:**
- Child topics show their own metrics
- Parent topics show summed metrics from all children + direct mentions

---

## Key Design Decisions

### 1. Every account-grain report includes `account_id` + `account_name`
Makes data lake queries easier — no join needed to see account names.

### 2. AI summaries isolated in separate report
TEXT fields can be large. Isolating them allows testing memory impact separately.
Could be merged with account-identity if no issues.

### 3. topic-summary is NEW (aggregated view)
Original specs only had per-account topic data. topic-summary provides:
- Accounts discussing count
- Total sentiment across all accounts
- Parent rollup aggregations

### 4. Build order optimized for testing
Start with simple/standalone → add complexity gradually.
If a report fails, you know exactly which data source is the problem.

---

## Original Specs vs. Split

| Original | Cols | Split Into |
|----------|------|------------|
| account-core | 78 | identity, health, insights, lifecycle-dates, activity-sentiment, ai-summaries |
| account-communication-stats | 52 | email-stats, meeting-stats, chat-stats, ticket-effort |
| account-owner-team | 27 | (unchanged) |
| stakeholder-fact | 41 | (unchanged) |
| account-topic-fact | 15 | (unchanged) |
| topic-dimension | 8 | (unchanged) |
| team-dimension | 14 | (unchanged) |
| lifecycle-event-history | 9 | (unchanged) |
| insight-snapshot | 8 | (unchanged) |
| meeting-summary | 12 | (unchanged) |
| **NEW: topic-summary** | 16 | (added for aggregated topic view) |

**Total: 10 original → 19 split**

---

*Created: December 11, 2025*
*Context: Nielsen 400 error workaround — split large specs into smaller reports*