# 06 - Account Meeting Stats

**Grain:** Account (one row per customer account)
**Columns:** ~13
**Primary Key:** `account_id`
**Build Order:** 6 of 19 (single source: calendar_event_prop)

---

## Column List

### Keys (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | customer.id |
| 2 | account_name | varchar(100) | Yes | customer.name |

### Meeting Statistics (9 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 3 | total_meetings | integer | Yes | calendar_event_prop |
| 4 | meeting_time_hours | numeric(10,2) | Yes | calendar_event_prop |
| 5 | team_meeting_time_hours | numeric(10,2) | Yes | calendar_event_prop |
| 6 | owner_meeting_time_hours | numeric(10,2) | Yes | calendar_event_prop |
| 7 | owner_total_meetings | integer | Yes | calendar_event_prop |
| 8 | last_meeting_date | timestamp | Yes | calendar_event_prop |
| 9 | last_dm_meeting_date | timestamp | Yes | calendar_event_prop |
| 10 | next_meeting_date | timestamp | Yes | calendar_event_prop |
| 11 | meeting_provider | varchar(50) | Yes | user_api_token |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 12 | extracted_at | timestamp | No | system |
| 13 | data_as_of | timestamp | No | system |

---

## Total: 13 columns

---

## Joins

- Links to **account-identity** via `account_id`

---

## Report Builder Fields

Primary source: `calendar_event_prop` table aggregated by account.
Provider from: `user_api_token`