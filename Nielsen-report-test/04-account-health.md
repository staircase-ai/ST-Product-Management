# 04 - Account Health

**Grain:** Account (one row per customer account)
**Columns:** ~14
**Primary Key:** `account_id`
**Build Order:** 4 of 19 (small, validates computed fields)

---

## Column List

### Keys (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | customer.id |
| 2 | account_name | varchar(100) | Yes | customer.name |

### Health Scores (10 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 3 | health_score | numeric(5,2) | Yes | computed |
| 4 | health_score_label | varchar(20) | Yes | computed |
| 5 | engagement_score | numeric(5,2) | Yes | computed |
| 6 | engagement_score_label | varchar(20) | Yes | computed |
| 7 | sentiment_score | numeric(5,2) | Yes | computed |
| 8 | sentiment_score_label | varchar(20) | Yes | computed |
| 9 | open_items_score | numeric(5,2) | Yes | computed |
| 10 | open_items_score_label | varchar(20) | Yes | computed |
| 11 | response_time_score | numeric(5,2) | Yes | computed |
| 12 | response_time_score_label | varchar(20) | Yes | computed |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 13 | extracted_at | timestamp | No | system |
| 14 | data_as_of | timestamp | No | system |

---

## Total: 14 columns

---

## Joins

- Links to **account-identity** via `account_id`

---

## Report Builder Fields

Health scores are computed/aggregated fields. Look for:
- Health Score, Engagement Score, Sentiment Score
- Open Items Score, Response Time Score
- Each score has a numeric value (0-100) and label (Red/Yellow/Green)