# Insight Delivery Architecture: Hooks vs. Exports vs. Both

**Status:** Design Decision Needed
**Priority:** High (P0)
**Created:** December 10, 2025
**Owner:** Brady Bluhm

---

## TLDR

We have three delivery mechanisms for insights/events: **Bulk Export** (weekly/monthly CSV), **Hooks** (real-time push), and **API** (on-demand pull). The question: Do we need all three? What goes where? How do we optimize for cost, scale, and customer value?

**Recommendation:** Hybrid approach — Hooks for **actionable moments**, Exports for **historical analysis**, API for **integration queries**.

---

## The Three Delivery Mechanisms

### 1. Bulk Export (Current Focus)
**What:** Weekly/monthly data dumps (insight-snapshot, lifecycle-event-history)
**When:** Scheduled (weekly, monthly)
**Format:** CSV/Parquet to S3, data warehouse
**Cost Model:** Compute at export time, storage in customer system

**Good For:**
- Historical analysis ("how many churn_risk events in Q3?")
- Trend analysis ("is account_dark increasing across portfolio?")
- Data warehouse integration (join with other business data)
- Audit/compliance (point-in-time snapshots)

**Bad For:**
- Real-time action ("alert me when churn_risk triggers")
- Immediate workflow automation
- High-frequency changes

### 2. Hooks (Real-Time Push)
**What:** Webhook/event push when insight triggers
**When:** Real-time (seconds/minutes after detection)
**Format:** JSON payload to customer endpoint
**Cost Model:** Per-event compute + delivery

**Good For:**
- Immediate action ("create Salesforce task when churn_risk detected")
- Alerting ("Slack message when account_dark triggers")
- Workflow automation ("trigger playbook on lifecycle event")
- Integration with operational systems

**Bad For:**
- Historical analysis (events are ephemeral unless customer stores)
- Trend analysis (no aggregation)
- High-volume scenarios (cost scales linearly)

### 3. API (On-Demand Pull)
**What:** REST/GraphQL endpoint to query current state
**When:** On-demand
**Format:** JSON response
**Cost Model:** Per-request compute

**Good For:**
- Integration queries ("get current insights for account X")
- Real-time dashboards (polling)
- Custom applications
- Selective data retrieval

**Bad For:**
- Bulk analysis (inefficient for large datasets)
- Historical data (only current state)
- Workflow automation (requires polling)

---

## Recommendation: Tiered Hybrid Approach

### Tier 1: Exports (Default for All)
**Include:** insight-snapshot, lifecycle-event-history
**Frequency:** Weekly or Monthly
**Cost:** Included in base pricing

Everyone gets historical data for analysis. No extra infrastructure needed.

### Tier 2: Hooks (Premium / Add-On)
**Include:** Real-time insight triggers, lifecycle events
**Frequency:** Real-time
**Cost:** Usage-based or premium tier

For customers who need immediate action. Priced to reflect per-event cost.

### Tier 3: API (Premium / Add-On)
**Include:** Current state queries, selective data retrieval
**Frequency:** On-demand
**Cost:** Usage-based or premium tier

For customers building custom integrations.

---

## What Goes Where?

| Data Type | Export | Hooks | API | Rationale |
|-----------|--------|-------|-----|-----------|
| **Insight Current State** (boolean flags) | ✅ | ❌ | ✅ | Point-in-time snapshot |
| **Insight History** (when triggered/resolved) | ✅ | ❌ | ❌ | Historical analysis |
| **Insight Trigger Event** (real-time) | ❌ | ✅ | ❌ | Immediate action |
| **Lifecycle Event Dates** (last occurrence) | ✅ | ❌ | ✅ | Point-in-time snapshot |
| **Lifecycle Event Stream** (each occurrence) | ✅ | ✅ | ❌ | Both analysis and action |
| **Health Score** | ✅ | ⚠️ | ✅ | Export + API; Hook only on threshold |
| **Health Score Change** | ❌ | ✅ | ❌ | Real-time alert on significant change |

**⚠️ = Conditional:** Only push via hook when significant (e.g., health drops >10 points)

---

## Implementation Phases

### Phase 1: Export Foundation (Current)
- insight-snapshot export (current state)
- lifecycle-event-history export (historical rows)
- Serves analysis use case

### Phase 2: Hook Infrastructure
- Event detection → webhook delivery pipeline
- Configurable event types per customer
- Retry logic, dead letter queue
- Usage metering

### Phase 3: Selective Hooks
- "Only alert on churn_risk and account_dark"
- Threshold-based hooks ("health drops >15 points")
- Reduces noise and cost

### Phase 4: API Layer
- Current state queries
- Selective field retrieval
- Rate limiting, caching

---

## Open Questions

1. **Pricing Model:** Should hooks be usage-based (per event) or flat fee?
2. **Event Filtering:** Can customers configure which events trigger hooks?
3. **Delivery Guarantees:** At-least-once? Exactly-once? How much do we invest in reliability?
4. **Backfill:** If customer enables hooks, do they get historical events?
5. **Hook Destinations:** Webhook only? Or also Slack, email, Salesforce native?

---

## Next Steps

1. **Validate with Engineering:** Confirm hook infrastructure plans and timeline
2. **Customer Research:** Which customers need real-time vs. batch?
3. **Cost Modeling:** Build detailed cost model for hooks at scale
4. **Pricing Discussion:** How does this affect packaging/tiers?

---

*This document captures initial thinking for the Insight Delivery Architecture decision. To be refined through engineering and customer input.*
