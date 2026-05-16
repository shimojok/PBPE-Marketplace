# PBPE Data Model and Schemas

The PBPE Data Model defines the structure for storing, calculating,  
and verifying PBPE credits across all biological and climate domains.  
It ensures consistency, traceability, and interoperability across the PBPE ecosystem.

---

# 1. Core Data Entities

| Entity | Description |
|--------|-------------|
| **Project** | A farm, facility, or supply chain node |
| **ImpactRecord** | Raw biological measurements |
| **Credit** | Issued PBPE credit |
| **VerificationRecord** | Validation and audit data |
| **Wallet** | Credit ownership |
| **Transaction** | Marketplace activity |

---

# 2. Project Schema


Project { project_id: string name: string location: string type: "crop" | "livestock" | "water" | "food" | "mixed" start_date: date metadata: object }


---

# 3. ImpactRecord Schema

ImpactRecord { record_id: string project_id: string impact_type: string value: number unit: string timestamp: datetime source: "sensor" | "lab" | "satellite" | "manual" metadata: object }


---

# 4. Credit Schema

Credit { pbpe_id: string credit_type: string project_id: string value: number unit: string issued_at: datetime verification_status: string metadata: object }


---

# 5. VerificationRecord Schema

VerificationRecord { verification_id: string pbpe_id: string verifier: string method: string status: "pending" | "verified" | "rejected" timestamp: datetime metadata: object }


---

# 6. Wallet Schema

Wallet { wallet_id: string owner: string balance: object created_at: datetime }


---

# 7. Transaction Schema

Transaction { tx_id: string pbpe_id: string from_wallet: string to_wallet: string price: number timestamp: datetime metadata: object }


---

# 8. Data Flow Architecture

1. **Data ingestion**  
2. **Impact calculation**  
3. **Credit issuance**  
4. **Verification**  
5. **Registry storage**  
6. **Marketplace transaction**  
7. **Dashboard visualization**

---

# 9. One-Sentence Summary

**The PBPE Data Model defines the schemas and data flow required to  
calculate, issue, verify, and trade PBPE credits across all domains.**
