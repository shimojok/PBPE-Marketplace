# Credit Issuance and Verification API

The Credit Issuance and Verification API handles the creation, validation,  
and registration of PBPE credits.  
It ensures transparency, traceability, and auditability across the PBPE Marketplace.

---

# 1. Credit Issuance Flow

1. **Data submission**  
2. **Impact calculation**  
3. **Credit generation**  
4. **Smart contract creation**  
5. **Wallet assignment**  
6. **Registry entry**  

Each credit receives a unique PBPE-ID.

---

# 2. Credit Types Supported

- ΔC‑SCC（Soil Carbon Credit）  
- MRC（Methane Reduction Credit）  
- NRC（Nitrous Oxide Reduction Credit）  
- SRC（Spoilage Reduction Credit）  
- QPC（Quality Premium Credit）  
- DRC（Disease Reduction Credit）  
- LHC（Livestock Health Credit）  
- FEC（Feed Efficiency Credit）  
- AMRC（AMR Reduction Credit）  
- WQC（Water Quality Credit）  

---

# 3. Issuance Endpoint

POST /api/v1/credits/issue

Payload example:

{ "credit_type": "ΔC-SCC", "project_id": "PBPE-AG-2026-001", "impact_value": 12.4, "unit": "tCO2e", "metadata": { "location": "Chiba, Japan", "method": "soil_sampling", "period": "2026-Q1" } }


---

# 4. Verification Endpoint

POST /api/v1/credits/verify

Verification includes:

- Data integrity checks  
- Satellite cross-check  
- Lab report validation  
- Smart contract audit  

---

# 5. Credit Registry Query

GET /api/v1/credits/{pbpe_id}

Returns:

- Credit type  
- Value  
- Owner wallet  
- Verification status  
- Timestamp  
- Metadata  

---

# 6. Smart Contract Integration

Each credit is:

- Tokenized  
- Immutable  
- Traceable  
- Auditable  

PBPE uses a **lightweight, gas-efficient contract model**.

---

# 7. One-Sentence Summary

**The Credit Issuance & Verification API generates, validates, and registers  
PBPE credits using secure smart contracts and transparent audit trails.**
