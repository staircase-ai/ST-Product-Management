# Insight Snapshot Export Specification

**Grain:** Account × Insight (one row per insight type per account)
**Estimated Rows:** ~5,000-500,000 per organization (accounts × 17 insight types)
**Primary Key:** `account_id` + `insight_type`
**Update Frequency:** Weekly or Monthly (bulk export)

---

## Purpose

Current state of all insight flags per account in row format. Alternative representation to the boolean columns in account-core — useful for analytics tools that prefer long/narrow data.

**Comparison:**
- **account-core:** Wide format — 17 insight columns per row (insight_account_dark, insight_no_qbr, etc.)
- **insight-snapshot:** Long format — 17 rows per account (one per insight type)

Choose based on your analytics tool preference.

---

## Column List

### Keys (3 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 1 | account_id | bigint | No | Account FK | insight.data_ref |
| 2 | organization_id | bigint | No | Staircase tenant ID | insight.organization_id |
| 3 | insight_type | varchar(100) | No | Type of insight | insight.type |

### Status (3 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 4 | is_active | boolean | Yes | Whether insight is currently active | insight |
| 5 | first_detected_date | timestamp | Yes | Date insight was first detected | insight.created_at |
| 6 | last_detected_date | timestamp | Yes | Date insight was last detected | insight |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 7 | extracted_at | timestamp | No | Timestamp when export was generated | system |
| 8 | data_as_of | timestamp | No | Timestamp of most recent data in export | system |

---

## Total Column Count: 8

---

## Insight Types

The 17 built-in insight types:

| Insight Type | Description | Category |
|--------------|-------------|---------|
| `account_dark` | Account has gone dark | Engagement |
| `no_reach_out` | No reach-out to account | Engagement |
| `no_meetings` | No meetings with account | Engagement |
| `no_next_meeting` | No next meeting scheduled | Engagement |
| `no_qbr` | No QBR scheduled or held | Engagement |
| `no_renewal_discussion` | No renewal discussion detected | Renewal |
| `no_exec_communication` | No executive-to-executive communication | Relationship |
| `single_threaded` | Single threaded account | Relationship |
| `churn_risk` | Churn risk detected | Risk |
| `churn_notification` | Churn notification detected | Risk |
| `positive_sentiment_trend` | Positive sentiment trend detected | Sentiment |
| `negative_sentiment_trend` | Negative sentiment trend detected | Sentiment |
| `account_responds_slower` | Account responds slower than usual | Engagement |
| `account_personnel_changes` | Account personnel changes detected | Change |
| `title_changed` | Stakeholder title has been changed | Change |
| `stakeholder_not_engaged` | Stakeholder not engaged | Engagement |
| `stakeholder_roles_undefined` | Stakeholder roles are not defined | Data Quality |

---

*Spec created: December 10, 2025*
