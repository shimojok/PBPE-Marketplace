# PBPE Ledger – Conceptual Schema

The PBPE Ledger records all PBPE-related events, including issuance, transfers,
settlements, and metadata updates. It is designed for transparency,
auditability, and interoperability with financial systems.

## Core Entities

### 1. Project
Represents a PBPE-generating project.

- `id` (string)
- `name`
- `location`
- `description`
- `status` (active, inactive, archived)

### 2. PBPEBatch
A batch of PBPE units issued from a project.

- `id` (string)
- `projectId`
- `quantity`
- `methodology`
- `issuedAt`
- `metadata` (JSON)

### 3. Account
Represents an entity that can hold PBPE units.

- `id` (string)
- `name`
- `type` (organization, individual, contract)

### 4. LedgerTransaction
Records any PBPE movement or event.

- `id` (string)
- `type` (issue, transfer, settle, retire)
- `timestamp`
- `fromAccount` (nullable)
- `toAccount` (nullable)
- `pbpeBatchId`
- `quantity`
- `metadata` (JSON)

## Relationships

Project 1 --- * PBPEBatch
PBPEBatch 1 --- * LedgerTransaction
Account 1 --- * LedgerTransaction (as sender)
Account 1 --- * LedgerTransaction (as receiver)

## Example Flow

1. Project issues PBPE batch  
2. PBPE batch is transferred to an account  
3. PBPE is settled between accounts  
4. Ledger records each event immutably  

## Next Steps

- Add compliance fields  
- Add audit trail extensions  
- Add multi-chain compatibility layer  
