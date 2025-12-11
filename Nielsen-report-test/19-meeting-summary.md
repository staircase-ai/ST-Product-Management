# 19 - Meeting Summary

**Grain:** Meeting (one row per meeting)
**Columns:** 14
**Primary Key:** `meeting_id`
**Build Order:** 19 of 19 (meeting rows)

---

## Column List

### Keys (4 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | meeting_id | bigint | No | calendar_event_raw.id |
| 2 | account_id | bigint | No | calendar_event_prop.customer_id |
| 3 | account_name | varchar(100) | Yes | customer.name |
| 4 | organization_id | bigint | No | calendar_event_raw.organization_id |

### Meeting Details (4 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 5 | meeting_date | timestamp | No | calendar_event_raw.start_time |
| 6 | meeting_duration_minutes | integer | Yes | calendar_event_raw |
| 7 | meeting_organizer_email | varchar(100) | Yes | calendar_event_raw.organizer_email |

### Attendee Metrics (3 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 8 | meeting_attendee_count | integer | Yes | calendar_event_attendee |
| 9 | meeting_internal_attendee_count | integer | Yes | calendar_event_attendee |
| 10 | meeting_customer_attendee_count | integer | Yes | calendar_event_attendee |

### AI Intelligence (1 column)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 11 | meeting_summary | text | Yes | computed (AI) |

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
- Links to **team-dimension** via organizer references
- Multiple meetings per account (1:many relationship)

---

## Notes

- `meeting_summary` is AI-generated from video call transcripts
- Not all meetings have summaries (requires recording integration)
- Summary quality depends on audio quality and transcript accuracy

---

## Use Cases

- **Meeting Cadence:** "How often are we meeting with Account X?"
- **Coverage Analysis:** "Which stakeholders attend meetings?"
- **AI Insights:** "What topics are discussed in meetings?"
- **Executive Engagement:** "Are executives attending QBRs?"

---

## Report Builder Fields

Primary source: `calendar_event_raw`, `calendar_event_prop`
Attendees: `calendar_event_attendee`
AI summary: Computed from video transcripts