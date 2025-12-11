# 09 - Account Lifecycle Dates

**Grain:** Account (one row per customer account)
**Columns:** ~17
**Primary Key:** `account_id`
**Build Order:** 9 of 19 (computed timestamps)

---

## Column List

### Keys (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | customer.id |
| 2 | account_name | varchar(100) | Yes | customer.name |

### Lifecycle Events — Last Occurrence Dates (13 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 3 | lifecycle_event_qbr | timestamp | Yes | computed |
| 4 | lifecycle_event_renewal | timestamp | Yes | computed |
| 5 | lifecycle_event_commercial_discussion | timestamp | Yes | computed |
| 6 | lifecycle_event_churn_notification | timestamp | Yes | computed |
| 7 | lifecycle_event_churn_risk | timestamp | Yes | computed |
| 8 | lifecycle_event_highly_positive | timestamp | Yes | computed |
| 9 | lifecycle_event_extremely_negative | timestamp | Yes | computed |
| 10 | lifecycle_event_account_personnel_changes | timestamp | Yes | computed |
| 11 | lifecycle_event_org_personnel_changes | timestamp | Yes | computed |
| 12 | lifecycle_event_exec_touchbase | timestamp | Yes | computed |
| 13 | lifecycle_event_expansion_opp | timestamp | Yes | computed |
| 14 | lifecycle_event_onboarding | timestamp | Yes | computed |
| 15 | next_qbr_date | date | Yes | computed |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 16 | extracted_at | timestamp | No | system |
| 17 | data_as_of | timestamp | No | system |

---

## Total: 17 columns

---

## Joins

- Links to **account-identity** via `account_id`

---

## Report Builder Fields

These are computed fields derived from insight detection timestamps.

Each lifecycle event date represents the most recent occurrence of that event type for the account.