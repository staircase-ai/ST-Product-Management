# Team Dimension Export Specification

**Grain:** Team Member (one row per internal user)
**Estimated Rows:** ~10-10,000 per organization (depends on team size)
**Primary Key:** `team_member_id`
**Update Frequency:** Monthly (dimension table — changes infrequently)

---

## Purpose

Lookup table for internal team members. Enables joining account-owner-team to get team member details, and supports team-level analytics.

---

## Column List

### Identity (9 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 1 | team_member_id | bigint | No | Unique team member identifier | users.id |
| 2 | organization_id | bigint | No | Staircase tenant ID | users.organization_id |
| 3 | team_member_email | varchar(100) | No | Team member email | users.email |
| 4 | team_member_name | varchar(200) | Yes | Team member full name | computed |
| 5 | team_member_first_name | varchar(100) | Yes | Team member first name | users.first_name |
| 6 | team_member_last_name | varchar(100) | Yes | Team member last name | users.last_name |
| 7 | team_member_title | varchar(200) | Yes | Team member job title | users.title (if available) |
| 8 | team_member_department | varchar(100) | Yes | Team member department | users.department (if available) |
| 9 | team_member_crm_id | varchar(100) | Yes | Team member CRM identifier | users.crm_id (if available) |

### Platform Access (3 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 10 | team_member_has_access | boolean | Yes | Team member has Staircase access | users.state = 'active' |
| 11 | team_member_excluded_from_analysis | boolean | Yes | Excluded from communication analysis | users.excluded (if available) |
| 12 | team_member_mailbox_connected | boolean | Yes | Team member mailbox connected | user_api_token |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 13 | extracted_at | timestamp | No | Timestamp when export was generated | system |
| 14 | data_as_of | timestamp | No | Timestamp of most recent data in export | system |

---

## Total Column Count: 14

---

*Spec created: December 10, 2025*
