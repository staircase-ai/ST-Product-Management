# Account Core Export Specification

**Grain:** Account (one row per customer account)
**Estimated Rows:** ~500-50,000 per organization
**Primary Key:** `account_id`
**Update Frequency:** Weekly or Monthly (bulk export)
**Related Tables:** account-communication-stats, account-owner-team

---

## Purpose

Core account intelligence: identity, lifecycle, health scores, insights, activity metrics, and AI summaries. This is the primary account export — most customers start here.

**Use with scheduled reports:** This spec is designed to map to Staircase's scheduled reports mechanism for reliable, best-practice exports.

---

## Column List

### Identity & Hierarchy (10 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 1 | account_id | bigint | No | Unique account identifier | customer.id |
| 2 | crm_id | varchar(100) | Yes | External CRM identifier | customer.crm_id |
| 3 | app_id | varchar(100) | Yes | External application identifier | customer.app_id |
| 4 | account_name | varchar(100) | Yes | Account company name | customer.name |
| 5 | domain | varchar(100) | Yes | Primary email domain | customer.domain |
| 6 | parent_account_id | bigint | Yes | Parent account ID for hierarchies | customer.parent_id |
| 7 | tier_id | bigint | Yes | Account tier FK | customer.tier_id |
| 8 | tier_name | varchar(50) | Yes | Account tier name (Low/Mid/High) | tier.name |
| 9 | owner_id | bigint | Yes | Account owner user FK | customer.owner |
| 10 | organization_id | bigint | No | Staircase tenant ID | customer.organization_id |

### Lifecycle & Status (7 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 11 | status | varchar(50) | Yes | Account status (active/churned) | customer.status |
| 12 | status_detail | varchar(100) | Yes | Detailed status information | customer.status_detail |
| 13 | journey_id | bigint | Yes | Journey phase FK | customer.journey_id |
| 14 | journey_phase_name | varchar(100) | Yes | Journey phase (Acquisition/Onboarding/Adoption/Renewal) | customer_journey.name |
| 15 | revenue | numeric | Yes | Account revenue/ARR | customer.revenue |
| 16 | renewal_date | date | Yes | Contract renewal date | customer.renewal |
| 17 | contract_start_date | date | Yes | Contract start date | customer.contract_start_date |

### Health Scores (10 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 18 | health_score | numeric(5,2) | Yes | Overall health score 0-100 | computed |
| 19 | health_score_label | varchar(20) | Yes | Health score label (Red/Yellow/Green) | computed |
| 20 | engagement_score | numeric(5,2) | Yes | Engagement score 0-100 | computed |
| 21 | engagement_score_label | varchar(20) | Yes | Engagement score label | computed |
| 22 | sentiment_score | numeric(5,2) | Yes | Sentiment score 0-100 | computed |
| 23 | sentiment_score_label | varchar(20) | Yes | Sentiment score label | computed |
| 24 | open_items_score | numeric(5,2) | Yes | Open items score 0-100 | computed |
| 25 | open_items_score_label | varchar(20) | Yes | Open items score label | computed |
| 26 | response_time_score | numeric(5,2) | Yes | Response time score 0-100 | computed |
| 27 | response_time_score_label | varchar(20) | Yes | Response time score label | computed |

### Insights — Boolean Flags (17 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 28 | insight_account_dark | boolean | Yes | Account has gone dark | insight |
| 29 | insight_no_reach_out | boolean | Yes | No reach-out to account | insight |
| 30 | insight_no_meetings | boolean | Yes | No meetings with account | insight |
| 31 | insight_no_next_meeting | boolean | Yes | No next meeting scheduled | insight |
| 32 | insight_no_qbr | boolean | Yes | No QBR scheduled or held | insight |
| 33 | insight_no_renewal_discussion | boolean | Yes | No renewal discussion detected | insight |
| 34 | insight_no_exec_communication | boolean | Yes | No executive-to-executive communication | insight |
| 35 | insight_single_threaded | boolean | Yes | Single threaded account | insight |
| 36 | insight_churn_risk | boolean | Yes | Churn risk detected | insight |
| 37 | insight_churn_notification | boolean | Yes | Churn notification detected | insight |
| 38 | insight_positive_sentiment_trend | boolean | Yes | Positive sentiment trend detected | insight |
| 39 | insight_negative_sentiment_trend | boolean | Yes | Negative sentiment trend detected | insight |
| 40 | insight_account_responds_slower | boolean | Yes | Account responds slower than usual | insight |
| 41 | insight_account_personnel_changes | boolean | Yes | Account personnel changes detected | insight |
| 42 | insight_title_changed | boolean | Yes | Stakeholder title has been changed | insight |
| 43 | insight_stakeholder_not_engaged | boolean | Yes | Stakeholder not engaged | insight |
| 44 | insight_stakeholder_roles_undefined | boolean | Yes | Stakeholder roles are not defined | insight |

### Lifecycle Events — Last Occurrence Dates (13 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 45 | lifecycle_event_qbr | timestamp | Yes | Last QBR date | computed |
| 46 | lifecycle_event_renewal | timestamp | Yes | Last renewal discussion detected | computed |
| 47 | lifecycle_event_commercial_discussion | timestamp | Yes | Last commercial discussion detected | computed |
| 48 | lifecycle_event_churn_notification | timestamp | Yes | Last churn notification date | computed |
| 49 | lifecycle_event_churn_risk | timestamp | Yes | Last churn risk detection date | computed |
| 50 | lifecycle_event_highly_positive | timestamp | Yes | Last highly positive message date | computed |
| 51 | lifecycle_event_extremely_negative | timestamp | Yes | Last extremely negative message date | computed |
| 52 | lifecycle_event_account_personnel_changes | timestamp | Yes | Last account personnel changes detected | computed |
| 53 | lifecycle_event_org_personnel_changes | timestamp | Yes | Last org personnel changes detected | computed |
| 54 | lifecycle_event_exec_touchbase | timestamp | Yes | Last executive touch-base | computed |
| 55 | lifecycle_event_expansion_opp | timestamp | Yes | Last expansion opportunity | computed |
| 56 | lifecycle_event_onboarding | timestamp | Yes | Last onboarding event date | computed |
| 57 | next_qbr_date | date | Yes | Next scheduled QBR date | computed |

### Activity Metrics (9 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 58 | last_engagement | timestamp | Yes | Last customer engagement activity | computed |
| 59 | last_reach_out | timestamp | Yes | Last team reach-out to customer | computed |
| 60 | last_touch | timestamp | Yes | Last touch with account | computed |
| 61 | last_touch_dm | timestamp | Yes | Last touch with decision maker | computed |
| 62 | total_activity | integer | Yes | Total activity count | computed |
| 63 | stakeholders_count | integer | Yes | Count of stakeholders | computed |
| 64 | users_count | integer | Yes | Count of internal users engaged | computed |
| 65 | multi_threaded | boolean | Yes | Whether account is multi-threaded | computed |
| 66 | last_note | text | Yes | Most recent manual note on account | computed |

### Sentiment — Aggregates (3 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 67 | positive_sentiment | integer | Yes | Count of positive sentiment communications | computed |
| 68 | neutral_sentiment | integer | Yes | Count of neutral sentiment communications | computed |
| 69 | negative_sentiment | integer | Yes | Count of negative sentiment communications | computed |

### Expansion Analyst (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 70 | ai_expansion_summary | text | Yes | AI-generated expansion opportunity summary | ai_expansion_opportunities |
| 71 | expansion_readiness_level | varchar(20) | Yes | Expansion readiness level (Low/Medium/High) | ai_expansion_opportunities |

### Churn Analyst (3 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 72 | ai_churn_analysis | text | Yes | AI-generated churn analysis summary | computed |
| 73 | ai_churn_risk_summary | text | Yes | AI-generated churn risk summary | ai_expansion_opportunities |
| 74 | churn_date | date | Yes | Date account churned (if churned) | customer |

### AI Summaries (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 75 | ai_account_summary | text | Yes | AI-generated account summary | computed |
| 76 | ai_renewal_analysis | text | Yes | AI-generated renewal analysis summary | computed |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Description | Source Table |
|---|-------------|-----------|----------|-------------|--------------|
| 77 | extracted_at | timestamp | No | Timestamp when export was generated | system |
| 78 | data_as_of | timestamp | No | Timestamp of most recent data in export | system |

---

## Total Column Count: 78

---

## Relationships

- Links to **account-communication-stats** via `account_id` (1:1)
- Links to **account-owner-team** via `account_id` (1:1)
- Links to **stakeholder_fact** via `account_id` (1:many)
- Links to **account_topic_fact** via `account_id` (1:many)
- Links to **lifecycle_event_history** via `account_id` (1:many)
- Links to **insight_snapshot** via `account_id` (1:many)
- Links to **meeting_summary** via `account_id` (1:many)
- Links to **team_dimension** via `owner_id` → `team_member_id`
- Self-referential: `parent_account_id` → `account_id` for account hierarchies

---

## Notes for Engineering

### Data Sources

1. **Primary table:** `customer` — Most identity and lifecycle fields
2. **Related tables:**
   - `customer_journey` — Journey phase names (join via `journey_id`)
   - `tier` — Tier names (join via `tier_id`)
   - `insight` — Boolean insight flags (pivot from insight table)
   - `ai_expansion_opportunities` — AI summaries and expansion readiness

### Computed Fields

Many fields are marked as `computed` — these are aggregations or calculations:
- Health scores: Proprietary algorithm combining engagement, sentiment, response time, open items
- Activity counts: Aggregations from email/meeting/chat/ticket
- Lifecycle event dates: Derived from insight detection timestamps

### Scheduled Reports Mapping

This spec is designed to align with Staircase's scheduled reports mechanism:
- Column names match UI field names where possible
- Grain is clearly account-level (one row per account)
- Can be exported as CSV or pushed to CS integration
- Weekly or Monthly schedule recommended

---

*Spec created: December 10, 2025*
