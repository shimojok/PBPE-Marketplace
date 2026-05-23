# PBPE Bond Pricing Model – Extended Version

This document defines the pricing logic for PBPE-backed Bonds.

---

## 1. Yield-Based Pricing Formula

Bond price is computed using:

\[
P = \sum_{t=1}^{T} \frac{C_t}{(1+y)^t} + \frac{N}{(1+y)^T}
\]

Where:

- \( P \): Bond price  
- \( C_t \): Coupon at time t (PBPE-linked)  
- \( y \): Market yield  
- \( N \): Notional  
- \( T \): Maturity  

---

## 2. PBPE-Linked Coupon

\[
\text{Coupon} = r_0 
+ \alpha \cdot \frac{\text{PBPE}_{\text{actual}} - \text{PBPE}_{\text{floor}}}{\text{PBPE}_{\text{floor}}}
+ \beta \cdot \frac{\text{Impact}_{\text{actual}} - \text{Impact}_{\text{floor}}}{\text{Impact}_{\text{floor}}}
\]

Bounded by:

\[
r_{\min} \le \text{Coupon} \le r_{\max}
\]

---

## 3. Market Risk Premium

\[
y = y_{\text{risk-free}} + \lambda_{\text{PBPE}} + \lambda_{\text{impact}}
\]

Where:

- \( \lambda_{\text{PBPE}} \): PBPE issuance uncertainty  
- \( \lambda_{\text{impact}} \): Impact verification risk  

---

## 4. Liquidity Model (PBPE Credit Market)

\[
\text{LiquidityScore} = \gamma_1 \cdot \text{Volume} + \gamma_2 \cdot \text{Volatility}^{-1}
\]

---

## 5. Integration with Marketplace API

Pricing uses:

- `/dashboard/pbpe`
- `/impact/carbon`
- `/finance/bonds`
- `/credits/price`

---

PBPE-backed Bonds convert verified biological & climate impact  
into a financial-grade asset class.
