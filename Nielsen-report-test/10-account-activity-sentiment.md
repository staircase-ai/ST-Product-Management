# 10 - Account Activity & Sentiment

**Grain:** Account (one row per customer account)
**Columns:** ~16
**Primary Key:** `account_id`
**Build Order:** 10 of 19 (aggregations)

---

## Column List

### Keys (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | customer.id |
| 2 | account_name | varchar(100) | Yes | customer.name |

### Activity Metrics (9 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 3 | last_engagement | timestamp | Yes | computed |
| 4 | last_reach_out | timestamp | Yes | computed |
| 5 | last_touch | timestamp | Yes | computed |
| 6 | last_touch_dm | timestamp | Yes | computed |
| 7 | total_activity | integer | Yes | computed |
| 8 | stakeholders_count | integer | Yes | computed |
| 9 | users_count | integer | Yes | computed |
| 10 | multi_threaded | boolean | Yes | computed |
| 11 | last_note | text | Yes | computed |

### Sentiment — Aggregates (3 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 12 | positive_sentiment | integer | Yes | computed |
| 13 | neutral_sentiment | integer | Yes | computed |
| 14 | negative_sentiment | integer | Yes | computed |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 15 | extracted_at | timestamp | No | system |
| 16 | data_as_of | timestamp | No | system |

---

## Total: 16 columns

---

## Joins

- Links to **account-identity** via `account_id`

---

## Report Builder Fields

All fields are computed aggregations:
- Activity counts: sum of email + meeting + chat + ticket
- Sentiment counts: aggregated from all communication channels
- Timestamps: most recent activity of each type