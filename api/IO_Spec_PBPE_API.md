# PBPE‑Marketplace API Specification

### Marketplace & External Integration Layer — API Contract

### Version 1.0 (Canonical English Edition)

---

## 1. Purpose

This document defines the **public API contract** for PBPE‑Marketplace.  
PBPE‑Marketplace exposes PBPE financial products, credits, and impact data to:

- Corporate buyers
- Foundations & DFIs
- Institutional investors
- Developers & integrators

This specification is authoritative for all external integrations.

---

# 2. Authentication

### **Auth Method**

- OAuth2 (Client Credentials or Authorization Code)
- JWT bearer tokens

### **Scopes**

|Scope|Description|
|---|---|
|read:products|Read financial products|
|read:credits|Read credit balances|
|read:impact|Read impact metrics|
|write:orders|Submit investment/purchase orders|
|read:reports|Access ESG / Scope 3 reports|

---

# 3. Core API Endpoints

---

## 3.1 GET /api/v1/products

**Description:**  
Returns all available PBPE financial products.

**Response (array of ProductSummary):**

|Field|Type|
|---|---|
|product_id|string|
|product_type|string|
|name|string|
|description|string|
|notional_usd|float|
|expected_return_pct|float|
|tenor_years|float|
|risk_score|float|
|underlying_credits_summary|object|
|impact_summary|object|

---

## 3.2 GET /api/v1/products/{product_id}

**Description:**  
Returns detailed information for a specific financial product.

**Response: ProductDetail**

|Field|Type|
|---|---|
|product_id|string|
|product_type|string|
|product_terms|object|
|underlying_credits|object|
|historical_performance|object|
|impact_breakdown|object|

---

## 3.3 GET /api/v1/credits/{tenant_id}

**Description:**  
Returns credit balances for a tenant.

**Response: CreditBalance**

|Field|Type|
|---|---|
|biosecurity_credits_balance|float|
|carbon_credits_balance|float|
|food_loss_credits_balance|float|
|quality_credits_balance|float|
|price_stability_credits_balance|float|

---

## 3.4 POST /api/v1/orders

**Description:**  
Submits a purchase or redemption order for a financial product.

**Request: OrderRequest**

|Field|Type|
|---|---|
|tenant_id|string|
|product_id|string|
|amount_usd|float|
|order_type|string (subscribe / redeem)|

**Response: OrderResponse**

|Field|Type|
|---|---|
|order_id|string|
|status|string|
|settlement_date|string (ISO8601)|

---

## 3.5 GET /api/v1/impact/{tenant_id}

**Description:**  
Returns impact metrics for a tenant (ESG + climate + social).

**Response: ImpactReport**

|Field|Type|
|---|---|
|total_ghg_reduction_tco2e|float|
|total_delta_c_tc|float|
|total_food_loss_reduction_t|float|
|supported_farmers_count|int|
|average_farmer_income_uplift_pct|float|
|sector_breakdown|object|
|region_breakdown|object|

---

## 3.6 GET /api/v1/scope3/{tenant_id}

**Description:**  
Returns Scope 3 emissions reduction data for corporate buyers.

**Response: Scope3Report**

|Field|Type|
|---|---|
|scope3_reduction_tco2e|float|
|methodology_reference|string|
|verification_status|string|
|reporting_period|string|

---

# 4. Data Model Definitions

---

## 4.1 ProductSummary

|Field|Type|
|---|---|
|product_id|string|
|product_type|string|
|name|string|
|description|string|
|notional_usd|float|
|expected_return_pct|float|
|tenor_years|float|
|risk_score|float|
|underlying_credits_summary|object|
|impact_summary|object|

---

## 4.2 ProductDetail

|Field|Type|
|---|---|
|product_id|string|
|product_type|string|
|product_terms|object|
|underlying_credits|object|
|historical_performance|object|
|impact_breakdown|object|

---

## 4.3 CreditBalance

|Field|Type|
|---|---|
|biosecurity_credits_balance|float|
|carbon_credits_balance|float|
|food_loss_credits_balance|float|
|quality_credits_balance|float|
|price_stability_credits_balance|float|

---

## 4.4 OrderRequest

|Field|Type|
|---|---|
|tenant_id|string|
|product_id|string|
|amount_usd|float|
|order_type|string|

---

## 4.5 OrderResponse

| Field           | Type   |
| --------------- | ------ |
| order_id        | string |
| status          | string |
| settlement_date | string |

---

## 4.6 ImpactReport

|Field|Type|
|---|---|
|total_ghg_reduction_tco2e|float|
|total_delta_c_tc|float|
|total_food_loss_reduction_t|float|
|supported_farmers_count|int|
|average_farmer_income_uplift_pct|float|
|sector_breakdown|object|
|region_breakdown|object|

---

## 4.7 Scope3Report

|Field|Type|
|---|---|
|scope3_reduction_tco2e|float|
|methodology_reference|string|
|verification_status|string|
|reporting_period|string|

---

# 5. Versioning

- API versioning follows `/api/v{number}/`
- Breaking changes increment the major version
- Non‑breaking additions increment the minor version

---
