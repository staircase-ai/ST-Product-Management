# 08 - Account Insights

**Grain:** Account (one row per customer account)
**Columns:** ~21
**Primary Key:** `account_id`
**Build Order:** 8 of 19 (insight table pivot)

---

## Column List

### Keys (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | customer.id |
| 2 | account_name | varchar(100) | Yes | customer.name |

### Insights — Boolean Flags (17 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 3 | insight_account_dark | boolean | Yes | insight |
| 4 | insight_no_reach_out | boolean | Yes | insight |
| 5 | insight_no_meetings | boolean | Yes | insight |
| 6 | insight_no_next_meeting | boolean | Yes | insight |
| 7 | insight_no_qbr | boolean | Yes | insight |
| 8 | insight_no_renewal_discussion | boolean | Yes | insight |
| 9 | insight_no_exec_communication | boolean | Yes | insight |
| 10 | insight_single_threaded | boolean | Yes | insight |
| 11 | insight_churn_risk | boolean | Yes | insight |
| 12 | insight_churn_notification | boolean | Yes | insight |
| 13 | insight_positive_sentiment_trend | boolean | Yes | insight |
| 14 | insight_negative_sentiment_trend | boolean | Yes | insight |
| 15 | insight_account_responds_slower | boolean | Yes | insight |
| 16 | insight_account_personnel_changes | boolean | Yes | insight |
| 17 | insight_title_changed | boolean | Yes | insight |
| 18 | insight_stakeholder_not_engaged | boolean | Yes | insight |
| 19 | insight_stakeholder_roles_undefined | boolean | Yes | insight |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 20 | extracted_at | timestamp | No | system |
| 21 | data_as_of | timestamp | No | system |

---

## Total: 21 columns

---

## Joins

- Links to **account-identity** via `account_id`

---

## Report Builder Fields

Source: `insight` table pivoted to boolean flags per account.

Each insight type is a separate boolean column indicating whether that insight is currently active for the account.