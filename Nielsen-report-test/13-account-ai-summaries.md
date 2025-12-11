# 13 - Account AI Summaries

**Grain:** Account (one row per customer account)
**Columns:** ~11
**Primary Key:** `account_id`
**Build Order:** 13 of 19 (TEXT fields - test memory)

---

## Column List

### Keys (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | customer.id |
| 2 | account_name | varchar(100) | Yes | customer.name |

### Expansion Analyst (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 3 | ai_expansion_summary | text | Yes | ai_expansion_opportunities |
| 4 | expansion_readiness_level | varchar(20) | Yes | ai_expansion_opportunities |

### Churn Analyst (3 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 5 | ai_churn_analysis | text | Yes | computed |
| 6 | ai_churn_risk_summary | text | Yes | ai_expansion_opportunities |

### AI Summaries (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 7 | ai_account_summary | text | Yes | computed |
| 8 | ai_renewal_analysis | text | Yes | computed |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 9 | extracted_at | timestamp | No | system |
| 10 | data_as_of | timestamp | No | system |

---

## Total: 10 columns

---

## Joins

- Links to **account-identity** via `account_id`

---

## Report Builder Fields

Source: `ai_expansion_opportunities` table + computed AI summaries.

**Note:** TEXT fields can be large. This report is isolated to allow testing memory impact separately from other account data.

**Alternative:** These fields could be merged into account-identity if memory is not an issue.