# 16 - Topic Summary (Aggregated)

**Grain:** Topic (one row per topic, aggregated across all accounts)
**Columns:** ~17
**Primary Key:** `topic_id`
**Build Order:** 16 of 19 (NEW - aggregated topic view)

---

## Purpose

Aggregated topic-level metrics across all accounts. Answers:
- "How many accounts discuss Topic X?"
- "What's the overall sentiment on Pricing across all customers?"
- "Which topics have the most activity?"

**Complements:**
- `topic-dimension` — Hierarchy lookup
- `account-topic-fact` — Per-account metrics

---

## Column List

### Topic Identity (4 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | topic_id | bigint | No | topic_parent.id |
| 2 | topic_name | varchar(100) | No | topic_parent.name |
| 3 | parent_topic_id | bigint | Yes | topic_child.topic_parent_id |
| 4 | parent_topic_name | varchar(100) | Yes | topic_parent.name |

### Aggregation Metadata (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 5 | is_parent_aggregate | boolean | No | computed |
| 6 | accounts_discussing_count | integer | Yes | computed |

### Sentiment — Aggregated (3 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 7 | total_positive_sentiment | integer | Yes | computed (SUM) |
| 8 | total_neutral_sentiment | integer | Yes | computed (SUM) |
| 9 | total_negative_sentiment | integer | Yes | computed (SUM) |

### Activity — Aggregated (5 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 10 | total_activity | integer | Yes | computed (SUM) |
| 11 | total_emails | integer | Yes | computed (SUM) |
| 12 | total_chat | integer | Yes | computed (SUM) |
| 13 | total_video | integer | Yes | computed (SUM) |
| 14 | total_tickets | integer | Yes | computed (SUM) |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 15 | extracted_at | timestamp | No | system |
| 16 | data_as_of | timestamp | No | system |

---

## Total: 16 columns

---

## Parent Rollup Logic

For parent topics (e.g., "Support Issues"):
- `is_parent_aggregate = TRUE`
- Metrics are summed from all child topics PLUS direct parent references
- Example: "Support Issues" total = Bug Reports + Feature Requests + Performance + direct "Support Issues" mentions

For child topics (e.g., "Bug Reports"):
- `is_parent_aggregate = FALSE`
- Metrics are from that specific topic only

---

## Computation (Pseudo-SQL)

```sql
-- Child topics
SELECT
  topic_id, topic_name, parent_topic_id, parent_topic_name,
  FALSE as is_parent_aggregate,
  COUNT(DISTINCT account_id) as accounts_discussing_count,
  SUM(topic_positive_sentiment) as total_positive_sentiment,
  SUM(topic_neutral_sentiment) as total_neutral_sentiment,
  SUM(topic_negative_sentiment) as total_negative_sentiment,
  SUM(topic_total_activity) as total_activity,
  SUM(topic_total_emails) as total_emails,
  SUM(topic_total_chat) as total_chat,
  SUM(topic_total_video) as total_video,
  SUM(topic_total_tickets) as total_tickets
FROM account_topic_fact
GROUP BY topic_id, topic_name, parent_topic_id, parent_topic_name

UNION ALL

-- Parent rollups
SELECT
  parent_topic_id as topic_id, parent_topic_name as topic_name,
  NULL as parent_topic_id, NULL as parent_topic_name,
  TRUE as is_parent_aggregate,
  COUNT(DISTINCT account_id) as accounts_discussing_count,
  SUM(topic_positive_sentiment) as total_positive_sentiment,
  -- ... etc
FROM account_topic_fact
WHERE parent_topic_id IS NOT NULL
GROUP BY parent_topic_id, parent_topic_name
```

---

## Joins

- Links to **topic-dimension** via `topic_id`
- Can be joined to **account-topic-fact** for drill-down

---

## Use Cases

- **Portfolio VOC:** "What are the top topics discussed across all accounts?"
- **Sentiment Analysis:** "Is overall sentiment on Pricing trending negative?"
- **Topic Comparison:** "Which topics have the most activity?"
- **Parent Rollups:** "How much total activity on Support Issues (including subtopics)?"

---

## Report Builder Notes

This is an **aggregated view** — may require custom query or report builder summary functionality.

Alternative: Nielsen can aggregate `account-topic-fact` in their data lake using the pseudo-SQL above.