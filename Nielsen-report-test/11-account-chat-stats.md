# 11 - Account Chat Stats

**Grain:** Account (one row per customer account)
**Columns:** ~17
**Primary Key:** `account_id`
**Build Order:** 11 of 19 (computed channel data)

---

## Column List

### Keys (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | customer.id |
| 2 | account_name | varchar(100) | Yes | customer.name |

### Chat Statistics (13 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 3 | total_chat_messages | integer | Yes | computed |
| 4 | team_sent_chat_messages | integer | Yes | computed |
| 5 | team_last_sent_chat_date | timestamp | Yes | computed |
| 6 | account_sent_chat_messages | integer | Yes | computed |
| 7 | account_last_sent_chat_date | timestamp | Yes | computed |
| 8 | chat_messages_sent_by_owner | integer | Yes | computed |
| 9 | team_chat_response_time_hours | numeric(10,2) | Yes | computed |
| 10 | account_chat_response_time_hours | numeric(10,2) | Yes | computed |
| 11 | last_dm_chat_date | timestamp | Yes | computed |
| 12 | chat_positive_sentiment | integer | Yes | computed |
| 13 | chat_neutral_sentiment | integer | Yes | computed |
| 14 | chat_negative_sentiment | integer | Yes | computed |
| 15 | chat_provider | varchar(50) | Yes | user_api_token |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 16 | extracted_at | timestamp | No | system |
| 17 | data_as_of | timestamp | No | system |

---

## Total: 17 columns

---

## Joins

- Links to **account-identity** via `account_id`

---

## Report Builder Fields

Chat statistics are computed aggregations.
Provider from: `user_api_token`

**Note:** Source tables for chat data need engineering validation.