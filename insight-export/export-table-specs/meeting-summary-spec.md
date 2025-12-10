# Meeting Summary Export Specification

**Grain:** Meeting (one row per meeting)
**Estimated Rows:** ~10,000-1,000,000 per organization (depends on meeting volume)
**Primary Key:** `meeting_id`
**Update Frequency:** Weekly or Monthly (bulk export)

---

## Purpose

Meeting-level intelligence: date, duration, attendees, and AI-generated summaries. Enables meeting pattern analysis and provides AI-extracted insights from customer conversations.

---

## Column List

### Keys (3 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 1 | meeting_id | bigint | No | Unique meeting identifier | calendar_event_raw.id |
| 2 | account_id | bigint | No | Account this meeting is associated with | calendar_event_prop.customer_id |
| 3 | organization_id | bigint | No | Staircase tenant ID | calendar_event_raw.organization_id |

### Meeting Details (4 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 4 | meeting_date | timestamp | No | Meeting start date/time | calendar_event_raw.start_time |
| 5 | meeting_duration_minutes | integer | Yes | Meeting duration in minutes | calendar_event_raw |
| 6 | meeting_organizer_email | varchar(100) | Yes | Meeting organizer email | calendar_event_raw.organizer_email |

### Attendee Metrics (4 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 7 | meeting_attendee_count | integer | Yes | Total meeting attendees | calendar_event_attendee |
| 8 | meeting_internal_attendee_count | integer | Yes | Internal team members in meeting | calendar_event_attendee |
| 9 | meeting_customer_attendee_count | integer | Yes | Customer stakeholders in meeting | calendar_event_attendee |

### AI Intelligence (1 column)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 10 | meeting_summary | text | Yes | AI-generated meeting summary | computed |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 11 | extracted_at | timestamp | No | Timestamp when export was generated | system |
| 12 | data_as_of | timestamp | No | Timestamp of most recent data in export | system |

---

## Total Column Count: 12

---

*Spec created: December 10, 2025*
