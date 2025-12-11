# 15 - Account Topic Fact

**Grain:** Account × Topic (one row per account-topic combination)
**Columns:** 17
**Primary Key:** `account_id` + `topic_id`
**Build Order:** 15 of 19 (bridge table)

---

## Column List

### Keys (4 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | topic_data.customer_id |
| 2 | account_name | varchar(100) | Yes | customer.name |
| 3 | topic_id | bigint | No | topic_data.topic_id |
| 4 | organization_id | bigint | No | topic_data.organization_id |

### Topic Identity (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 5 | topic_name | varchar(100) | Yes | topic_parent.name |
| 6 | parent_topic_name | varchar(100) | Yes | topic_parent.name |

### Sentiment (3 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 7 | topic_positive_sentiment | integer | Yes | topic_data |
| 8 | topic_neutral_sentiment | integer | Yes | topic_data |
| 9 | topic_negative_sentiment | integer | Yes | topic_data |

### Activity Counts (5 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 10 | topic_total_activity | integer | Yes | topic_data |
| 11 | topic_total_emails | integer | Yes | topic_data |
| 12 | topic_total_chat | integer | Yes | topic_data |
| 13 | topic_total_video | integer | Yes | topic_data |
| 14 | topic_total_tickets | integer | Yes | topic_data |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 15 | extracted_at | timestamp | No | system |
| 16 | data_as_of | timestamp | No | system |

---

## Total: 16 columns

---

## Grain Understanding

This is a **sparse** table — only account-topic combinations with activity are included.

If an account never discusses "Pricing," there's no row for that account-topic pair.
Absence = zero activity (not null).

---

## Joins

- Links to **account-identity** via `account_id`
- Links to **topic-dimension** via `topic_id`
- Links to **topic-summary** via `topic_id`

---

## Use Cases

- **Per-Account VOC:** "What topics does Account X discuss?"
- **Sentiment by Topic:** "Is Account X's sentiment around Pricing negative?"
- **Topic Activity:** "How much is Account X engaging on Support Issues?"

---

## Report Builder Fields

Primary source: `topic_data` table
Topic names: `topic_parent`, `topic_child`