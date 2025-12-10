# Lifecycle Event History Export Specification

**Grain:** Account × Event (one row per event occurrence)
**Estimated Rows:** ~10,000-1,000,000 per organization (accounts × events detected)
**Primary Key:** `event_id` or composite `account_id` + `event_type` + `event_date`
**Update Frequency:** Weekly or Monthly (bulk export)

---

## Purpose

Historical record of lifecycle events detected per account. Enables trend analysis, event counting, and aggregations that the "last_date" approach in account-core doesn't support.

**Current State Limitation:** Today, lifecycle events are stored as "last date per event type" at account level. This spec documents the ideal target state for event-level export.

---

## Column List

### Keys (4 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 1 | event_id | bigint | No | Unique event identifier | insight.id (if available) |
| 2 | account_id | bigint | No | Account FK | insight.data_ref / customer_id |
| 3 | organization_id | bigint | No | Staircase tenant ID | insight.organization_id |
| 4 | event_type | varchar(100) | No | Type of lifecycle event | insight.type |

### Event Details (3 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 5 | event_date | timestamp | No | Date/time event was detected | insight.created_at |
| 6 | event_source | varchar(50) | Yes | Source channel (email/meeting/chat) | computed |
| 7 | event_context | text | Yes | Additional context (if available) | varies |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 8 | extracted_at | timestamp | No | Timestamp when export was generated | system |
| 9 | data_as_of | timestamp | No | Timestamp of most recent data in export | system |

---

## Total Column Count: 9

---

## Event Types

Based on the insight table and lifecycle event configuration:

| Event Type | Description | Detection Source |
|------------|-------------|------------------|
| `qbr` | QBR meeting detected | Calendar |
| `renewal` | Renewal discussion detected | Email/Meeting |
| `commercial_discussion` | Commercial/pricing discussion | Email/Meeting |
| `churn_notification` | Churn notification detected | Email |
| `churn_risk` | Churn risk signal detected | Computed |
| `highly_positive` | Highly positive message | Email/Chat |
| `extremely_negative` | Extremely negative message | Email/Chat |
| `account_personnel_changes` | Account personnel change | Email |
| `org_personnel_changes` | Organization personnel change | Email |
| `exec_touchbase` | Executive touch-base | Email/Meeting |
| `expansion_opp` | Expansion opportunity detected | Computed |
| `onboarding` | Onboarding event | Email/Meeting |

---

*Spec created: December 10, 2025*
