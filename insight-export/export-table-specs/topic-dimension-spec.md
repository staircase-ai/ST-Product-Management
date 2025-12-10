# Topic Dimension Export Specification

**Grain:** Topic (one row per topic)
**Estimated Rows:** ~100-5,000 per organization (depends on topic configuration)
**Primary Key:** `topic_id`
**Update Frequency:** Monthly (dimension table — changes infrequently)

---

## Purpose

Lookup table for topic hierarchy. Enables joining account-topic-fact to get topic names and parent relationships.

---

## Column List

### Identity (5 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 1 | topic_id | bigint | No | Unique topic identifier | topic_parent.id |
| 2 | organization_id | bigint | No | Staircase tenant ID | topic_parent.organization_id |
| 3 | topic_name | varchar(100) | No | Topic name | topic_parent.name |
| 4 | parent_topic_id | bigint | Yes | Parent topic ID (for child topics) | topic_child.topic_parent_id |
| 5 | topic_description | text | Yes | Topic description | topic_parent.description |

### Metadata (1 column)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 6 | topic_created_at | timestamp | Yes | When topic was created | topic_parent.created_at |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 7 | extracted_at | timestamp | No | Timestamp when export was generated | system |
| 8 | data_as_of | timestamp | No | Timestamp of most recent data in export | system |

---

## Total Column Count: 8

---

*Spec created: December 10, 2025*
