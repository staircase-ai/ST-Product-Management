# 01 - Team Dimension

**Grain:** Team Member (one row per internal user)
**Columns:** 14
**Primary Key:** `team_member_id`
**Build Order:** 1 of 19 (standalone dimension, no joins)

---

## Column List

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | team_member_id | bigint | No | users.id |
| 2 | organization_id | bigint | No | users.organization_id |
| 3 | team_member_email | varchar(100) | No | users.email |
| 4 | team_member_name | varchar(200) | Yes | computed |
| 5 | team_member_first_name | varchar(100) | Yes | users.first_name |
| 6 | team_member_last_name | varchar(100) | Yes | users.last_name |
| 7 | team_member_title | varchar(200) | Yes | users.title |
| 8 | team_member_department | varchar(100) | Yes | users.department |
| 9 | team_member_crm_id | varchar(100) | Yes | users.crm_id |
| 10 | team_member_has_access | boolean | Yes | users.state = 'active' |
| 11 | team_member_excluded_from_analysis | boolean | Yes | users.excluded |
| 12 | team_member_mailbox_connected | boolean | Yes | user_api_token |
| 13 | extracted_at | timestamp | No | system |
| 14 | data_as_of | timestamp | No | system |

---

## Joins

- **From account-owner-team:** `owner_id` → `team_member_id`
- **From meeting-summary:** organizer/attendee references

---

## Report Builder Fields

Select from `users` table:
- id, organization_id, email, first_name, last_name, title, department, crm_id, state, excluded

Check `user_api_token` for mailbox_connected status.