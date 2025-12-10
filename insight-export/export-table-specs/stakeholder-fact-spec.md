# Stakeholder Fact Export Specification

**Grain:** Stakeholder (one row per contact)
**Estimated Rows:** ~5,000-500,000 per organization (typically 10-100 stakeholders per account)
**Primary Key:** `stakeholder_id`
**Update Frequency:** Weekly or Monthly (bulk export)

---

## Purpose

Individual contact engagement data. Shows relationship health at the person level — who's engaged, who's disengaged, sentiment by stakeholder.

---

## Column List

### Identity (10 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 1 | stakeholder_id | bigint | No | Unique identifier for stakeholder | stakeholder.id |
| 2 | account_id | bigint | No | Account this stakeholder belongs to | stakeholder.customer_id |
| 3 | stakeholder_email | varchar(200) | Yes | Stakeholder email address | stakeholder.email |
| 4 | stakeholder_name | varchar(100) | Yes | Stakeholder name | stakeholder.name |
| 5 | stakeholder_title | varchar(200) | Yes | Stakeholder job title | stakeholder.title |
| 6 | stakeholder_crm_id | varchar(100) | Yes | Stakeholder CRM identifier | stakeholder.crm_id |
| 7 | stakeholder_type | varchar(50) | Yes | Stakeholder type | stakeholder.type |
| 8 | stakeholder_gs_role | varchar(50) | Yes | Gainsight role (Decision Maker/Champion/Executive Sponsor) | stakeholder.role |
| 9 | stakeholder_touch_frequency | varchar(50) | Yes | Expected touch frequency | stakeholder.touch_frequency |
| 10 | stakeholder_muted | boolean | Yes | Stakeholder is muted | stakeholder.muted |
| 11 | stakeholder_opted_out | boolean | Yes | Opted out of AI analysis | stakeholder.opted_out |

### Activity Metrics (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 12 | stakeholder_last_engagement | timestamp | Yes | Last engagement with stakeholder | computed |
| 13 | stakeholder_last_reach_out | timestamp | Yes | Last reach out to stakeholder | computed |

### Email Statistics (8 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 14 | stakeholder_last_received_email | timestamp | Yes | Last email received from stakeholder | email_prop |
| 15 | stakeholder_last_sent_email | timestamp | Yes | Last email sent to stakeholder | email_prop |
| 16 | stakeholder_sent_emails | integer | Yes | Emails sent by stakeholder | email_prop |
| 17 | stakeholder_response_time_hours | numeric(10,2) | Yes | Average response time | computed |
| 18 | stakeholder_email_relationships | integer | Yes | Count of email relationships | computed |
| 19 | stakeholder_emails_positive | integer | Yes | Stakeholder emails with positive sentiment | email_prop |
| 20 | stakeholder_emails_negative | integer | Yes | Stakeholder emails with negative sentiment | email_prop |
| 21 | stakeholder_emails_neutral | integer | Yes | Stakeholder emails with neutral sentiment | email_prop |

### Meeting Statistics (8 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 22 | stakeholder_attended_meetings | integer | Yes | Meetings attended by stakeholder | calendar_event_attendee |
| 23 | stakeholder_accepted_meetings | integer | Yes | Meetings accepted by stakeholder | calendar_event_attendee |
| 24 | stakeholder_invited_meetings | integer | Yes | Meeting invitations to stakeholder | calendar_event_attendee |
| 25 | stakeholder_last_attended_meeting | timestamp | Yes | Date of last attended meeting | calendar_event_attendee |
| 26 | stakeholder_next_scheduled_meeting | timestamp | Yes | Date of next scheduled meeting | calendar_event_attendee |
| 27 | stakeholder_attended_calls | integer | Yes | Video calls attended | calendar_event_attendee |
| 28 | stakeholder_accepted_calls | integer | Yes | Video calls accepted | calendar_event_attendee |
| 29 | stakeholder_show_rate | numeric(5,2) | Yes | Video call attendance rate (%) | computed |

### Chat Statistics (5 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 30 | stakeholder_sent_chat_messages | integer | Yes | Chat messages sent by stakeholder | computed |
| 31 | stakeholder_chat_positive | integer | Yes | Stakeholder chat with positive sentiment | computed |
| 32 | stakeholder_chat_negative | integer | Yes | Stakeholder chat with negative sentiment | computed |
| 33 | stakeholder_chat_neutral | integer | Yes | Stakeholder chat with neutral sentiment | computed |

### Ticket Statistics (1 column)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 34 | stakeholder_submitted_tickets | integer | Yes | Tickets submitted by stakeholder | computed |

### Sentiment — Overall (5 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 35 | stakeholder_positive_items | integer | Yes | Total items with positive sentiment | computed |
| 36 | stakeholder_neutral_items | integer | Yes | Total items with neutral sentiment | computed |
| 37 | stakeholder_negative_items | integer | Yes | Total items with negative sentiment | computed |
| 38 | stakeholder_sentiment_score | numeric(5,2) | Yes | Overall stakeholder sentiment score (0-100) | computed |
| 39 | stakeholder_sentiment | varchar(20) | Yes | Stakeholder sentiment label | computed |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 40 | extracted_at | timestamp | No | Timestamp when export was generated | system |
| 41 | data_as_of | timestamp | No | Timestamp of most recent data in export | system |

---

## Total Column Count: 41

---

*Spec created: December 10, 2025*
