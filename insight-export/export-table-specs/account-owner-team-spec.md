# Account Owner & Team Export Specification

**Grain:** Account (one row per customer account)
**Estimated Rows:** ~500-50,000 per organization
**Primary Key:** `account_id`
**Update Frequency:** Weekly or Monthly (bulk export)
**Related Tables:** account-core (parent), team-dimension

---

## Purpose

Owner and team member metrics for each account. Includes account owner properties and activity metrics. Designed to be extensible for instance-specific team roles (CSM, CAM, etc.) that follow the same pattern.

---

## Column List

### Key (1 column)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 1 | account_id | bigint | No | Unique account identifier (FK to account-core) | customer.id |

### Owner Identity (9 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 2 | owner_id | bigint | Yes | Account owner user FK | customer.owner |
| 3 | owner_first_name | varchar(100) | Yes | Account owner first name | users |
| 4 | owner_last_name | varchar(100) | Yes | Account owner last name | users |
| 5 | owner_email | varchar(100) | Yes | Account owner email | users |
| 6 | owner_title | varchar(200) | Yes | Account owner job title | users |
| 7 | owner_department | varchar(100) | Yes | Owner department | users |
| 8 | owner_crm_id | varchar(100) | Yes | Owner CRM identifier | users |
| 9 | owner_has_staircase_access | boolean | Yes | Owner has Staircase access | users |
| 10 | owner_excluded_from_analysis | boolean | Yes | Owner excluded from analysis | users |

### Owner Communication Stats (14 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 11 | owner_mailbox_connected | boolean | Yes | Owner mailbox connected | user_api_token |
| 12 | owner_sent_emails | integer | Yes | Emails sent by owner to this account | email_prop |
| 13 | owner_received_emails | integer | Yes | Emails received by owner from this account | email_prop |
| 14 | owner_response_time_hours | numeric(10,2) | Yes | Owner average response time | computed |
| 15 | owner_emails_positive_sentiment | integer | Yes | Owner emails with positive sentiment | email_prop |
| 16 | owner_emails_neutral_sentiment | integer | Yes | Owner emails with neutral sentiment | email_prop |
| 17 | owner_emails_negative_sentiment | integer | Yes | Owner emails with negative sentiment | email_prop |
| 18 | owner_attended_meetings | integer | Yes | Meetings attended by owner with this account | calendar_event_attendee |
| 19 | owner_meetings_time_hours | numeric(10,2) | Yes | Owner time in meetings with this account | calendar_event_attendee |
| 20 | owner_sent_messages | integer | Yes | Chat messages sent by owner to this account | computed |
| 21 | owner_chat_response_time_hours | numeric(10,2) | Yes | Owner chat response time | computed |
| 22 | owner_assigned_tickets | integer | Yes | Tickets assigned to owner for this account | computed |
| 23 | owner_effort_hours | numeric(10,2) | Yes | Owner effort in hours for this account | computed |

### Owner Cross-Account Metrics (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 24 | owner_owned_accounts_count | integer | Yes | Total accounts owned by this owner | computed |
| 25 | owner_owned_accounts_revenue | numeric(12,2) | Yes | Total revenue of accounts owned by this owner | computed |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 26 | extracted_at | timestamp | No | Timestamp when export was generated | system |
| 27 | data_as_of | timestamp | No | Timestamp of most recent data in export | system |

---

## Total Column Count: 27

---

## Instance-Specific Team Roles (Extensible Pattern)

Beyond the account owner, many organizations have additional team roles assigned to accounts (CSM, CAM, TAM, etc.). These follow the same pattern as owner fields.

### Adding a Team Role

For each additional team role synced from CRM, add a column set following this pattern:

```
{role}_id                       bigint      Team member FK
{role}_first_name               varchar     First name
{role}_last_name                varchar     Last name
{role}_email                    varchar     Email
{role}_title                    varchar     Job title
{role}_department               varchar     Department
{role}_crm_id                   varchar     CRM identifier
{role}_has_staircase_access     boolean     Has platform access
{role}_excluded_from_analysis   boolean     Excluded from analysis
{role}_mailbox_connected        boolean     Mailbox connected
{role}_sent_emails              integer     Emails sent
{role}_received_emails          integer     Emails received
{role}_response_time_hours      numeric     Avg response time
{role}_attended_meetings        integer     Meetings attended
{role}_meetings_time_hours      numeric     Time in meetings
{role}_sent_messages            integer     Chat messages sent
{role}_chat_response_time_hours numeric     Chat response time
{role}_assigned_tickets         integer     Tickets assigned
{role}_effort_hours             numeric     Effort hours
```

**Example roles:** CSM, CAM, TAM, Solutions Architect, Executive Sponsor

---

*Spec created: December 10, 2025*
