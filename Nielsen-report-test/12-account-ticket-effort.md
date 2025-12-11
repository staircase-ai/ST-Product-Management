# 12 - Account Ticket & Effort Stats

**Grain:** Account (one row per customer account)
**Columns:** ~16
**Primary Key:** `account_id`
**Build Order:** 12 of 19 (computed channel data)

---

## Column List

### Keys (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | customer.id |
| 2 | account_name | varchar(100) | Yes | customer.name |

### Ticket Statistics (7 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 3 | submitted_tickets | integer | Yes | computed |
| 4 | ticket_comments | integer | Yes | computed |
| 5 | team_ticket_response_time_hours | numeric(10,2) | Yes | computed |
| 6 | account_ticket_response_time_hours | numeric(10,2) | Yes | computed |
| 7 | tickets_to_owner | integer | Yes | computed |
| 8 | last_ticket_opened_date | timestamp | Yes | computed |
| 9 | ticket_provider | varchar(50) | Yes | user_api_token |

### Effort Metrics (5 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 10 | team_effort_hours | numeric(10,2) | Yes | computed |
| 11 | owner_effort_hours | numeric(10,2) | Yes | computed |
| 12 | team_effort_cost | numeric(12,2) | Yes | computed |
| 13 | efficiency_rate | numeric(10,4) | Yes | computed |
| 14 | time_frame_revenue | numeric(12,2) | Yes | computed |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 15 | extracted_at | timestamp | No | system |
| 16 | data_as_of | timestamp | No | system |

---

## Total: 16 columns

---

## Joins

- Links to **account-identity** via `account_id`

---

## Report Builder Fields

Ticket and effort metrics are computed aggregations.
Provider from: `user_api_token`

**Note:** Source tables for ticket data need engineering validation.