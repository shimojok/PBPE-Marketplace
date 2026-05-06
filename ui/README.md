# PBPE Marketplace – UI Layer

The UI layer provides the primary interface for interacting with the PBPE
Marketplace. It enables users to explore PBPE projects, view impact data,
issue PBPE units, perform settlements, and access marketplace analytics.

## Purpose

- Present PBPE data in a clear, intuitive way  
- Enable project owners to issue PBPE units  
- Allow investors and institutions to evaluate PBPE quality  
- Provide transaction and settlement interfaces  
- Connect seamlessly with the PBPE Marketplace API  

## UI Structure

ui/
├── pages/
│   ├── index.md
│   ├── projects.md
│   ├── project-detail.md
│   ├── pbpe-issue.md
│   ├── pbpe-rating.md
│   ├── pbpe-settlement.md
│   └── analytics.md
└── components/

## Core Pages

### 1. Dashboard (`index.md`)
- Overview of PBPE Marketplace  
- Key metrics  
- Recent transactions  
- Featured projects  

### 2. Projects (`projects.md`)
- List of all PBPE projects  
- Filters: region, methodology, status  

### 3. Project Detail (`project-detail.md`)
- Project description  
- Impact data  
- PBPE batches  
- Rating information  

### 4. PBPE Issuance (`pbpe-issue.md`)
- Form to issue new PBPE units  
- Connects to: `POST /pbpe/issue`  

### 5. PBPE Rating (`pbpe-rating.md`)
- View rating results  
- Connects to: `POST /pbpe/rating`  

### 6. PBPE Settlement (`pbpe-settlement.md`)
- Transfer PBPE units between accounts  
- Connects to: `POST /pbpe/settle`  

### 7. Analytics (`analytics.md`)
- Marketplace-wide metrics  
- PBPE flows  
- Geographic distribution  

## API Integration

The UI interacts with the PBPE Marketplace API:

- `/projects`  
- `/projects/{id}`  
- `/pbpe/issue`  
- `/pbpe/rating`  
- `/pbpe/settle`  
- `/ledger/transactions`  

## Next Steps

- Add wireframes  
- Add component definitions  
- Add UI → API data mapping  
