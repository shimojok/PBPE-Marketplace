# PBPE-ID and Metadata Specification

The PBPE-ID and Metadata Specification defines the unique identifier  
and metadata structure for all PBPE credits.  
It ensures traceability, auditability, and interoperability across  
the PBPE Marketplace.

---

# 1. PBPE-ID Format

Each credit receives a globally unique PBPE-ID:

PBPE-{CREDIT_TYPE}-{YEAR}-{PROJECT}-{SERIAL}

Example:

PBPE-MRC-2026-CHIBA-000142

Components:

- **CREDIT_TYPE**: ΔC-SCC, MRC, NRC, SRC, QPC, etc.  
- **YEAR**: issuance year  
- **PROJECT**: project code  
- **SERIAL**: incremental unique number  

---

# 2. Metadata Structure

Metadata includes:

- Project information  
- Location  
- Methodology  
- Data sources  
- Verification logs  
- Issuance timestamp  
- Contract hash  
- Environmental context  

---

# 3. Metadata Schema

Metadata { project_id: string, location: string, method: string, period: string, data_sources: array, verifier: string, verification_status: string, timestamp: datetime, contract_hash: string, additional_info: object }


---

# 4. Data Provenance

Metadata stores:

- Sensor data hashes  
- Lab report references  
- Satellite imagery IDs  
- Audit log references  

This ensures full traceability.

---

# 5. Interoperability

PBPE-ID is compatible with:

- National carbon registries  
- ESG reporting systems  
- Supply chain traceability platforms  
- Government incentive programs  

---

# 6. One-Sentence Summary

**PBPE-ID provides a globally unique identifier and metadata structure  
that ensures full traceability and auditability of every PBPE credit.**
