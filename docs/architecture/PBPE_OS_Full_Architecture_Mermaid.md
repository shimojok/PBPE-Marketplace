# PBPE Operating System – Full Architecture Diagram (Mermaid)

```mermaid
flowchart TD

    L1[Layer 1: MBT-Biosecurity-Engine<br>Biological Improvements] --> L2
    L2[Layer 2: PBPE Dashboard<br>KPI Generation & PBPE Value] --> L3
    L3[Layer 3: PBPE Finance<br>Credit Creation & Pricing] --> L4
    L4[Layer 4: PBPE Marketplace<br>Trading & ESG Integration] --> L5
    L5[Layer 5: Reporting & ESG<br>Scope 3, Impact Reports]

    subgraph Evidence
        E1[MBT55 Biosecurity Evidence]
        E2[MBT55 Biocontrol Evidence]
    end

    E1 --> L1
    E2 --> L1

    L4 -->|API| External[Enterprises / ESG / Investors]
