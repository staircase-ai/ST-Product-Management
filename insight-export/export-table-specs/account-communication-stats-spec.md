# Account Communication Stats Export Specification

**Grain:** Account (one row per customer account)
**Estimated Rows:** ~500-50,000 per organization
**Primary Key:** `account_id`
**Update Frequency:** Weekly or Monthly (bulk export)
**Related Tables:** account-core (parent)

---

## Purpose

Detailed communication statistics across all channels: email, meetings, chat, tickets. Supplement to account-core for teams needing granular channel analytics.

---

## Column List

### Key (1 column)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 1 | account_id | bigint | No | Unique account identifier (FK to account-core) | customer.id |

### Email Statistics (15 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 2 | total_emails | integer | Yes | Total email count | email_prop |
| 3 | team_sent_emails | integer | Yes | Total emails sent by team | email_prop |
| 4 | team_last_sent_email_date | timestamp | Yes | Date of last email sent by team | email_prop |
| 5 | account_sent_emails | integer | Yes | Total emails sent by account | email_prop |
| 6 | account_last_sent_email_date | timestamp | Yes | Date of last email from account | email_prop |
| 7 | emails_sent_by_owner | integer | Yes | Emails sent by account owner | email_prop |
| 8 | team_email_response_time_hours | numeric(10,2) | Yes | Avg team response time to emails (hrs) | computed |
| 9 | account_email_response_time_hours | numeric(10,2) | Yes | Avg account response time to emails (hrs) | computed |
| 10 | team_open_email_threads | integer | Yes | Open email threads from team | computed |
| 11 | account_open_email_threads | integer | Yes | Open email threads from account | computed |
| 12 | email_last_touch_dm | timestamp | Yes | Last email touch with decision maker | email_prop |
| 13 | email_positive_sentiment | integer | Yes | Emails with positive sentiment | email_prop |
| 14 | email_neutral_sentiment | integer | Yes | Emails with neutral sentiment | email_prop |
| 15 | email_negative_sentiment | integer | Yes | Emails with negative sentiment | email_prop |
| 16 | email_provider | varchar(50) | Yes | Email integration provider | user_api_token |

### Meeting Statistics (9 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 17 | total_meetings | integer | Yes | Total meeting count | calendar_event_prop |
| 18 | meeting_time_hours | numeric(10,2) | Yes | Total meeting hours | calendar_event_prop |
| 19 | team_meeting_time_hours | numeric(10,2) | Yes | Team time in meetings | calendar_event_prop |
| 20 | owner_meeting_time_hours | numeric(10,2) | Yes | Owner time in meetings | calendar_event_prop |
| 21 | owner_total_meetings | integer | Yes | Owner total meeting count | calendar_event_prop |
| 22 | last_meeting_date | timestamp | Yes | Date of last meeting that occurred | calendar_event_prop |
| 23 | last_dm_meeting_date | timestamp | Yes | Last meeting with decision maker | calendar_event_prop |
| 24 | next_meeting_date | timestamp | Yes | Date of next scheduled meeting | calendar_event_prop |
| 25 | meeting_provider | varchar(50) | Yes | Calendar integration provider | user_api_token |

### Chat Statistics (12 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 26 | total_chat_messages | integer | Yes | Total chat message count | computed |
| 27 | team_sent_chat_messages | integer | Yes | Total chat messages sent by team | computed |
| 28 | team_last_sent_chat_date | timestamp | Yes | Date of last chat sent by team | computed |
| 29 | account_sent_chat_messages | integer | Yes | Total chat messages sent by account | computed |
| 30 | account_last_sent_chat_date | timestamp | Yes | Date of last chat from account | computed |
| 31 | chat_messages_sent_by_owner | integer | Yes | Chat messages sent by account owner | computed |
| 32 | team_chat_response_time_hours | numeric(10,2) | Yes | Avg team response time to chat (hrs) | computed |
| 33 | account_chat_response_time_hours | numeric(10,2) | Yes | Avg account response time to chat (hrs) | computed |
| 34 | last_dm_chat_date | timestamp | Yes | Last chat with decision maker | computed |
| 35 | chat_positive_sentiment | integer | Yes | Chat messages with positive sentiment | computed |
| 36 | chat_neutral_sentiment | integer | Yes | Chat messages with neutral sentiment | computed |
| 37 | chat_negative_sentiment | integer | Yes | Chat messages with negative sentiment | computed |
| 38 | chat_provider | varchar(50) | Yes | Chat integration provider | user_api_token |

### Ticket Statistics (7 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 39 | submitted_tickets | integer | Yes | Total submitted tickets | computed |
| 40 | ticket_comments | integer | Yes | Total ticket comments | computed |
| 41 | team_ticket_response_time_hours | numeric(10,2) | Yes | Avg team response time to tickets (hrs) | computed |
| 42 | account_ticket_response_time_hours | numeric(10,2) | Yes | Avg account response time to tickets (hrs) | computed |
| 43 | tickets_to_owner | integer | Yes | Tickets submitted to account owner | computed |
| 44 | last_ticket_opened_date | timestamp | Yes | Date of last ticket opened | computed |
| 45 | ticket_provider | varchar(50) | Yes | Ticket integration provider | user_api_token |

### Effort Metrics (5 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 46 | team_effort_hours | numeric(10,2) | Yes | Total team effort in hours | computed |
| 47 | owner_effort_hours | numeric(10,2) | Yes | Owner effort in hours | computed |
| 48 | team_effort_cost | numeric(12,2) | Yes | Team effort cost in dollars | computed |
| 49 | efficiency_rate | numeric(10,4) | Yes | Effort cost / time frame revenue | computed |
| 50 | time_frame_revenue | numeric(12,2) | Yes | Revenue for effort time frame | computed |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 51 | extracted_at | timestamp | No | Timestamp when export was generated | system |
| 52 | data_as_of | timestamp | No | Timestamp of most recent data in export | system |

---

## Total Column Count: 52

---

*Spec created: December 10, 2025*
