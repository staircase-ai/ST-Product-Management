# 03 - Account Identity

**Grain:** Account (one row per customer account)
**Columns:** ~21
**Primary Key:** `account_id`
**Build Order:** 3 of 19 (foundation table, simple joins)

---

## Column List

### Keys (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 1 | account_id | bigint | No | customer.id |
| 2 | account_name | varchar(100) | Yes | customer.name |

### Identity & Hierarchy (8 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 3 | organization_id | bigint | No | customer.organization_id |
| 4 | crm_id | varchar(100) | Yes | customer.crm_id |
| 5 | app_id | varchar(100) | Yes | customer.app_id |
| 6 | domain | varchar(100) | Yes | customer.domain |
| 7 | parent_account_id | bigint | Yes | customer.parent_id |
| 8 | tier_id | bigint | Yes | customer.tier_id |
| 9 | tier_name | varchar(50) | Yes | tier.name |
| 10 | owner_id | bigint | Yes | customer.owner |

### Lifecycle & Status (7 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 11 | status | varchar(50) | Yes | customer.status |
| 12 | status_detail | varchar(100) | Yes | customer.status_detail |
| 13 | journey_id | bigint | Yes | customer.journey_id |
| 14 | journey_phase_name | varchar(100) | Yes | customer_journey.name |
| 15 | revenue | numeric | Yes | customer.revenue |
| 16 | renewal_date | date | Yes | customer.renewal |
| 17 | contract_start_date | date | Yes | customer.contract_start_date |

### System Fields (2 columns)

| # | Column Name | Data Type | Nullable | Source |
|---|-------------|-----------|----------|--------|
| 18 | churn_date | date | Yes | customer.churn_date |
| 19 | extracted_at | timestamp | No | system |
| 20 | data_as_of | timestamp | No | system |

---

## Total: ~20 columns

---

## Joins

- **Foundation table** — all other account-grain reports join here via `account_id`
- Links to `tier` table via `tier_id`
- Links to `customer_journey` via `journey_id`
- Self-referential: `parent_account_id` → `account_id`

---

## Report Builder Fields

Primary table: `customer`
Join: `tier.name` via `tier_id`
Join: `customer_journey.name` via `journey_id`