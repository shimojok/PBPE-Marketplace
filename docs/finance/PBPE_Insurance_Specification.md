# PBPE Insurance – Biosecurity × Finance Specification

PBPE Insurance provides risk transfer products linked to:

- Biosecurity risk reduction
- Yield stability
- Environmental shocks

---

## 1. Core Concepts

- Insured Object: Farm / facility / region
- Risk Drivers: Disease, crop failure, environmental shock
- Protection Basis: MBT55 biosecurity + PBPE stability index

---

## 2. Premium Formula

$$
\text{Premium} = \phi_1 \cdot \text{BiosecurityRisk}+ \phi_2 \cdot \text{YieldVolatility}- \phi_3 \cdot \text{StabilityIndex}
$$

---

## 3. API Overview

- `GET /finance/insurance/products`
- `POST /finance/insurance/quote`
- `GET /finance/insurance/policies`
