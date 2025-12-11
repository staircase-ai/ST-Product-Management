# 02 - Topic Dimension

**Grain:** Topic (one row per topic)
**Columns:** 8
**Primary Key:** `topic_id`
**Build Order:** 2 of 19 (standalone dimension, no joins)

---

## Column List

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | topic_id | bigint | No | topic_parent.id |
| 2 | organization_id | bigint | No | topic_parent.organization_id |
| 3 | topic_name | varchar(100) | No | topic_parent.name |
| 4 | parent_topic_id | bigint | Yes | topic_child.topic_parent_id |
| 5 | topic_description | text | Yes | topic_parent.description |
| 6 | topic_created_at | timestamp | Yes | topic_parent.created_at |
| 7 | extracted_at | timestamp | No | system |
| 8 | data_as_of | timestamp | No | system |

---

## Topic Hierarchy

```
Parent Topic (topic_parent)
├── Child Topic 1 (topic_child)
├── Child Topic 2 (topic_child)
└── Child Topic 3 (topic_child)
```

**Examples:**
- Support Issues → Bug Reports, Feature Requests, Performance
- Pricing → Renewal Pricing, Expansion Pricing, Discounts

---

## Joins

- **From account-topic-fact:** `topic_id`
- **From topic-summary:** `topic_id`
- Self-referential: `parent_topic_id` → `topic_id`

---

## Report Builder Fields

Select from `topic_parent` and `topic_child` tables.