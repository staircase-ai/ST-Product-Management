# 14 - Stakeholder Fact

**Grain:** Stakeholder (one row per contact)
**Columns:** 41
**Primary Key:** `stakeholder_id`
**Build Order:** 14 of 19 (different grain, moderate complexity)

---

## Column List

### Identity (11 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | stakeholder_id | bigint | No | stakeholder.id |
| 2 | account_id | bigint | No | stakeholder.customer_id |
| 3 | account_name | varchar(100) | Yes | customer.name |
| 4 | stakeholder_email | varchar(200) | Yes | stakeholder.email |
| 5 | stakeholder_name | varchar(100) | Yes | stakeholder.name |
| 6 | stakeholder_title | varchar(200) | Yes | stakeholder.title |
| 7 | stakeholder_crm_id | varchar(100) | Yes | stakeholder.crm_id |
| 8 | stakeholder_type | varchar(50) | Yes | stakeholder.type |
| 9 | stakeholder_gs_role | varchar(50) | Yes | stakeholder.role |
| 10 | stakeholder_touch_frequency | varchar(50) | Yes | stakeholder.touch_frequency |
| 11 | stakeholder_muted | boolean | Yes | stakeholder.muted |
| 12 | stakeholder_opted_out | boolean | Yes | stakeholder.opted_out |

### Activity Metrics (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 13 | stakeholder_last_engagement | timestamp | Yes | computed |
| 14 | stakeholder_last_reach_out | timestamp | Yes | computed |

### Email Statistics (8 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 15 | stakeholder_last_received_email | timestamp | Yes | email_prop |
| 16 | stakeholder_last_sent_email | timestamp | Yes | email_prop |
| 17 | stakeholder_sent_emails | integer | Yes | email_prop |
| 18 | stakeholder_response_time_hours | numeric(10,2) | Yes | computed |
| 19 | stakeholder_email_relationships | integer | Yes | computed |
| 20 | stakeholder_emails_positive | integer | Yes | email_prop |
| 21 | stakeholder_emails_negative | integer | Yes | email_prop |
| 22 | stakeholder_emails_neutral | integer | Yes | email_prop |

### Meeting Statistics (8 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 23 | stakeholder_attended_meetings | integer | Yes | calendar_event_attendee |
| 24 | stakeholder_accepted_meetings | integer | Yes | calendar_event_attendee |
| 25 | stakeholder_invited_meetings | integer | Yes | calendar_event_attendee |
| 26 | stakeholder_last_attended_meeting | timestamp | Yes | calendar_event_attendee |
| 27 | stakeholder_next_scheduled_meeting | timestamp | Yes | calendar_event_attendee |
| 28 | stakeholder_attended_calls | integer | Yes | calendar_event_attendee |
| 29 | stakeholder_accepted_calls | integer | Yes | calendar_event_attendee |
| 30 | stakeholder_show_rate | numeric(5,2) | Yes | computed |

### Chat Statistics (4 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 31 | stakeholder_sent_chat_messages | integer | Yes | computed |
| 32 | stakeholder_chat_positive | integer | Yes | computed |
| 33 | stakeholder_chat_negative | integer | Yes | computed |
| 34 | stakeholder_chat_neutral | integer | Yes | computed |

### Ticket Statistics (1 column)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 35 | stakeholder_submitted_tickets | integer | Yes | computed |

### Sentiment — Overall (5 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 36 | stakeholder_positive_items | integer | Yes | computed |
| 37 | stakeholder_neutral_items | integer | Yes | computed |
| 38 | stakeholder_negative_items | integer | Yes | computed |
| 39 | stakeholder_sentiment_score | numeric(5,2) | Yes | computed |
| 40 | stakeholder_sentiment | varchar(20) | Yes | computed |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 41 | extracted_at | timestamp | No | system |
| 42 | data_as_of | timestamp | No | system |

---

## Total: 42 columns

---

## Joins

- Links to **account-identity** via `account_id`
- Many stakeholders per account (1:many relationship)

---

## Report Builder Fields

Primary source: `stakeholder` table
Email: `email_prop` aggregated by stakeholder
Meetings: `calendar_event_attendee` aggregated by stakeholder