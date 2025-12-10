# Account Topic Fact Export Specification

**Grain:** Account × Topic (one row per account-topic combination)
**Estimated Rows:** ~50,000-5,000,000 per organization (accounts × topics discussed)
**Primary Key:** `account_id` + `topic_id`
**Update Frequency:** Weekly or Monthly (bulk export)

---

## Purpose

Topic-level sentiment and activity per account. Answers questions like: "What topics does this account discuss? What's the sentiment around pricing? Are they talking about competitors?"

This is the "Voice of Customer" intelligence at the topic level — critical for Nielsen's "Fact VOC Product" table.

---

## Column List

### Keys (3 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 1 | account_id | bigint | No | Account FK | topic_data.customer_id |
| 2 | topic_id | bigint | No | Topic FK (parent topic) | topic_data.topic_id |
| 3 | organization_id | bigint | No | Staircase tenant ID | topic_data.organization_id |

### Topic Identity (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 4 | topic_name | varchar(100) | Yes | Topic name | topic_parent.name |
| 5 | parent_topic_name | varchar(100) | Yes | Parent topic name (for child topics) | topic_parent.name |

### Sentiment (3 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 6 | topic_positive_sentiment | integer | Yes | Positive sentiment count for topic | topic_data |
| 7 | topic_neutral_sentiment | integer | Yes | Neutral sentiment count for topic | topic_data |
| 8 | topic_negative_sentiment | integer | Yes | Negative sentiment count for topic | topic_data |

### Activity Counts (5 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 9 | topic_total_activity | integer | Yes | Total activity count for topic | topic_data |
| 10 | topic_total_emails | integer | Yes | Total emails for topic | topic_data |
| 11 | topic_total_chat | integer | Yes | Total chat messages for topic | topic_data |
| 12 | topic_total_video | integer | Yes | Total video summaries for topic | topic_data |
| 13 | topic_total_tickets | integer | Yes | Total tickets for topic | topic_data |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 14 | extracted_at | timestamp | No | Timestamp when export was generated | system |
| 15 | data_as_of | timestamp | No | Timestamp of most recent data in export | system |

---

## Total Column Count: 15

---

*Spec created: December 10, 2025*
