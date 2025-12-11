# 17 - Lifecycle Event History

**Grain:** Account × Event (one row per lifecycle event occurrence)
**Columns:** 11
**Primary Key:** `account_id` + `event_type` + `event_timestamp`
**Build Order:** 17 of 19 (event rows)

---

## Column List

### Keys (3 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | insight.customer_id |
| 2 | account_name | varchar(100) | Yes | customer.name |
| 3 | organization_id | bigint | No | insight.organization_id |

### Event Details (6 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 4 | event_type | varchar(50) | No | insight.type |
| 5 | event_timestamp | timestamp | No | insight.detected_at |
| 6 | event_resolved_at | timestamp | Yes | insight.resolved_at |
| 7 | event_is_active | boolean | Yes | computed |
| 8 | event_duration_days | integer | Yes | computed |
| 9 | event_details | text | Yes | insight.details |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 10 | extracted_at | timestamp | No | system |
| 11 | data_as_of | timestamp | No | system |

---

## Total: 11 columns

---

## Event Types

| Event Type | Description |
|------------|-------------|
| qbr | QBR held |
| renewal | Renewal discussion detected |
| commercial_discussion | Commercial discussion detected |
| churn_notification | Churn notification received |
| churn_risk | Churn risk detected |
| highly_positive | Highly positive message |
| extremely_negative | Extremely negative message |
| account_personnel_changes | Account personnel change |
| org_personnel_changes | Org personnel change |
| exec_touchbase | Executive touch-base |
| expansion_opp | Expansion opportunity |
| onboarding | Onboarding event |

---

## Relationship to account-lifecycle-dates

- **account-lifecycle-dates:** One row per account, shows LAST occurrence of each event type
- **lifecycle-event-history:** Multiple rows per account, shows ALL occurrences

---

## Joins

- Links to **account-identity** via `account_id`

---

## Use Cases

- **Event Timeline:** "Show all lifecycle events for Account X"
- **Trend Analysis:** "How many churn_risk events across portfolio in Q3?"
- **Audit:** "When was the last QBR held?"