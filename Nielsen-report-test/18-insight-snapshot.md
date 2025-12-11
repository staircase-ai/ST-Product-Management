# 18 - Insight Snapshot

**Grain:** Account × Insight (one row per insight per account)
**Columns:** 10
**Primary Key:** `account_id` + `insight_type`
**Build Order:** 18 of 19 (snapshot rows)

---

## Column List

### Keys (3 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | insight.customer_id |
| 2 | account_name | varchar(100) | Yes | customer.name |
| 3 | organization_id | bigint | No | insight.organization_id |

### Insight Details (5 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 4 | insight_type | varchar(50) | No | insight.type |
| 5 | insight_is_active | boolean | Yes | computed |
| 6 | insight_first_detected | timestamp | Yes | insight.created_at |
| 7 | insight_last_detected | timestamp | Yes | insight.updated_at |
| 8 | insight_resolved_at | timestamp | Yes | insight.resolved_at |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 9 | extracted_at | timestamp | No | system |
| 10 | data_as_of | timestamp | No | system |

---

## Total: 10 columns

---

## Insight Types

| Insight Type | Description |
|--------------|-------------|
| account_dark | Account has gone dark |
| no_reach_out | No reach-out to account |
| no_meetings | No meetings with account |
| no_next_meeting | No next meeting scheduled |
| no_qbr | No QBR scheduled or held |
| no_renewal_discussion | No renewal discussion |
| no_exec_communication | No exec-to-exec communication |
| single_threaded | Single threaded account |
| churn_risk | Churn risk detected |
| churn_notification | Churn notification detected |
| positive_sentiment_trend | Positive sentiment trend |
| negative_sentiment_trend | Negative sentiment trend |
| account_responds_slower | Account responds slower |
| account_personnel_changes | Account personnel changes |
| title_changed | Stakeholder title changed |
| stakeholder_not_engaged | Stakeholder not engaged |
| stakeholder_roles_undefined | Stakeholder roles undefined |

---

## Relationship to account-insights

- **account-insights:** One row per account, boolean columns for each insight type
- **insight-snapshot:** Multiple rows per account (one per active/historical insight)

---

## Joins

- Links to **account-identity** via `account_id`

---

## Use Cases

- **Insight History:** "When was churn_risk first detected for Account X?"
- **Resolution Tracking:** "Which insights have been resolved?"
- **Portfolio Analysis:** "How many accounts have active account_dark insights?"