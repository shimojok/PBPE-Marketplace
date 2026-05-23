# PBPE Dashboard v3 – Unified Planetary Value View (UI Mockup)

PBPE Dashboard v3 is the unified interface for PBPE OS,  
combining biological, climate, financial, and enterprise metrics into a single view.

---

## 1. Layout Overview

The dashboard is organized into **three main rows**:

1. **Top Row – Global KPIs (Cards)**
2. **Middle Row – Impact & Value Flows (Charts)**
3. **Bottom Row – Markets & Enterprise Adoption (Tables / Mini‑cards)**

---

## 2. Top Row – Global KPI Cards

Displayed as 4–6 horizontal cards.

**Card 1 – Annual GHG Reduction**

- Label: `Annual GHG Reduction`
- Value: `510,000,000 tCO₂e / year`
- Subtext: `Units deployed: 54,850`
- Source: `/dashboard/summary`

**Card 2 – PBPE Issuance**

- Label: `PBPE Issued`
- Value: `620,000,000 PBPE / year`
- Subtext: `Carbon / Biosecurity / Food Loss / Quality`
- Source: `/dashboard/pbpe`

**Card 3 – PBPE Market Value**

- Label: `PBPE Market Value`
- Value: `$6.2B / year`
- Subtext: `PBPE price: $10 / PBPE`
- Source: `/dashboard/summary`, `/dashboard/credits/market`

**Card 4 – Green Premium**

- Label: `Green Premium`
- Value: `−¥22.5T / year`
- Subtext: `Profitable climate model`
- Source: `/dashboard/summary`

**Card 5 – ROI & Payback**

- Label: `ROI`
- Value: `344% / year`
- Subtext: `Payback: 3.5 months`
- Source: `/dashboard/summary`

**Card 6 – Scope 3 Reduction**

- Label: `Scope 3 Reduction`
- Value: `180,000,000 tCO₂e / year`
- Subtext: `Linked companies: 128`
- Source: `/dashboard/summary`, `/impact/scope3`, `/dashboard/enterprise/usage`

---

## 3. Middle Row – Impact & Value Flows

### 3.1 Left – GHG Reduction Breakdown (Stacked Bar / Column)

- Title: `GHG Reduction by Source`
- X‑Axis: `Source`
  - Waste avoidance
  - Food loss
  - Soil carbon
  - Fertilizer reduction
  - Livestock methane
  - Rice methane
  - Biomass increase
  - Others
- Y‑Axis: `tCO₂e / year`
- Source: `/dashboard/ghg-breakdown`

### 3.2 Right – PBPE Value Flywheel (Circular / Node Diagram)

Nodes:

1. `Investment (¥ / year)`
2. `Ecosystem Improvement Index`
3. `Productivity Index`
4. `PBPE Issuance (PBPE / year)`
5. `Value Distribution (Farmers / Enterprises / Governments)`
6. `Economic Return (¥ / year)`
7. `Reinvestment Rate`

Each node displays:

- Label
- Key numeric value
- Tooltip with explanation

Source: `/dashboard/flywheel`

---

## 4. Bottom Row – Markets & Enterprise Adoption

### 4.1 Left – PBPE Credits Market (Table)

Columns:

- `Type` (Carbon, Biosecurity, Food Loss, Quality)
- `Volume (PBPE)`
- `Price (USD)`
- `Value (USD)`

Source: `/dashboard/credits/market`

### 4.2 Center – PBPE‑Backed Bonds (Mini Table / Cards)

Columns:

- `Bond ID`
- `Outstanding (USD)`
- `Coupon (%)`
- `Linked PBPE Floor`
- `Maturity`

Source: `/dashboard/finance/bonds`, `/finance/bonds`, `/finance/bonds/price`

### 4.3 Right – Enterprise Adoption (Mini Cards)

Cards:

- `Companies Onboarded`
- `Countries`
- `Sectors`
- `Scope 3 Reports Linked`

Source: `/dashboard/enterprise/usage`

---

## 5. Interaction Model

- Time filter (top right): `Year / Quarter / Custom`
- Segment filter: `By sector / By region`
- Export buttons:
  - `Export ESG Report`
  - `Export Scope 3 Summary`
  - `Download PBPE Data (CSV/JSON)`

---

PBPE Dashboard v3 is the primary interface for  
enterprises, governments, and investors to understand PBPE OS performance.
