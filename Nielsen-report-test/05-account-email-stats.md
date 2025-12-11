# 05 - Account Email Stats

**Grain:** Account (one row per customer account)
**Columns:** ~19
**Primary Key:** `account_id`
**Build Order:** 5 of 19 (single source: email_prop)

---

## Column List

### Keys (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | customer.id |
| 2 | account_name | varchar(100) | Yes | customer.name |

### Email Statistics (15 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 3 | total_emails | integer | Yes | email_prop |
| 4 | team_sent_emails | integer | Yes | email_prop |
| 5 | team_last_sent_email_date | timestamp | Yes | email_prop |
| 6 | account_sent_emails | integer | Yes | email_prop |
| 7 | account_last_sent_email_date | timestamp | Yes | email_prop |
| 8 | emails_sent_by_owner | integer | Yes | email_prop |
| 9 | team_email_response_time_hours | numeric(10,2) | Yes | computed |
| 10 | account_email_response_time_hours | numeric(10,2) | Yes | computed |
| 11 | team_open_email_threads | integer | Yes | computed |
| 12 | account_open_email_threads | integer | Yes | computed |
| 13 | email_last_touch_dm | timestamp | Yes | email_prop |
| 14 | email_positive_sentiment | integer | Yes | email_prop |
| 15 | email_neutral_sentiment | integer | Yes | email_prop |
| 16 | email_negative_sentiment | integer | Yes | email_prop |
| 17 | email_provider | varchar(50) | Yes | user_api_token |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 18 | extracted_at | timestamp | No | system |
| 19 | data_as_of | timestamp | No | system |

---

## Total: 19 columns

---

## Joins

- Links to **account-identity** via `account_id`

---

## Report Builder Fields

Primary source: `email_prop` table aggregated by account.
Provider from: `user_api_token`