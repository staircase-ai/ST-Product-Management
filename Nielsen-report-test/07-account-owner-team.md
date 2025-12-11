# 07 - Account Owner & Team

**Grain:** Account (one row per customer account)
**Columns:** 29
**Primary Key:** `account_id`
**Build Order:** 7 of 19 (moderate complexity)

---

## Column List

### Keys (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | customer.id |
| 2 | account_name | varchar(100) | Yes | customer.name |

### Owner Identity (9 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 3 | owner_id | bigint | Yes | customer.owner |
| 4 | owner_first_name | varchar(100) | Yes | users |
| 5 | owner_last_name | varchar(100) | Yes | users |
| 6 | owner_email | varchar(100) | Yes | users |
| 7 | owner_title | varchar(200) | Yes | users |
| 8 | owner_department | varchar(100) | Yes | users |
| 9 | owner_crm_id | varchar(100) | Yes | users |
| 10 | owner_has_staircase_access | boolean | Yes | users |
| 11 | owner_excluded_from_analysis | boolean | Yes | users |

### Owner Communication Stats (14 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 12 | owner_mailbox_connected | boolean | Yes | user_api_token |
| 13 | owner_sent_emails | integer | Yes | email_prop |
| 14 | owner_received_emails | integer | Yes | email_prop |
| 15 | owner_response_time_hours | numeric(10,2) | Yes | computed |
| 16 | owner_emails_positive_sentiment | integer | Yes | email_prop |
| 17 | owner_emails_neutral_sentiment | integer | Yes | email_prop |
| 18 | owner_emails_negative_sentiment | integer | Yes | email_prop |
| 19 | owner_attended_meetings | integer | Yes | calendar_event_attendee |
| 20 | owner_meetings_time_hours | numeric(10,2) | Yes | calendar_event_attendee |
| 21 | owner_sent_messages | integer | Yes | computed |
| 22 | owner_chat_response_time_hours | numeric(10,2) | Yes | computed |
| 23 | owner_assigned_tickets | integer | Yes | computed |
| 24 | owner_effort_hours | numeric(10,2) | Yes | computed |

### Owner Cross-Account Metrics (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 25 | owner_owned_accounts_count | integer | Yes | computed |
| 26 | owner_owned_accounts_revenue | numeric(12,2) | Yes | computed |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 27 | extracted_at | timestamp | No | system |
| 28 | data_as_of | timestamp | No | system |

---

## Total: 28 columns

---

## Joins

- Links to **account-identity** via `account_id`
- Links to **team-dimension** via `owner_id` → `team_member_id`

---

## Report Builder Fields

- Owner identity: `users` table via `customer.owner` FK
- Owner communication: `email_prop`, `calendar_event_attendee` filtered by owner_id
- Cross-account metrics: aggregations across all accounts owned by this owner