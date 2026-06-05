Aura Enterprise Engine

Project Overview

Aura Enterprise Engine is an enterprise inventory management platform built for a commercial logistics use case. The system manages over 50,000 SKUs across multiple warehouses with real-time analytics, advanced filtering, and instant search capabilities.

---

Live Demo

[View Live Application](https://aura-enterprise-engine-peach.vercel.app/dashboard)

---

The Business Problem

The client managed inventory for over 40 retail chains using a combination of legacy software and spreadsheet-based workflows.

Attempting to load the complete inventory dataset caused severe performance issues, browser freezes, delayed inventory updates, stockouts, and operational inefficiencies.

---

The Solution

Aura Enterprise Engine provides a fast, scalable inventory command center capable of handling enterprise-scale datasets without browser performance degradation.

The platform enables:

- Instant inventory access
- Advanced search and filtering
- Real-time analytics
- CSV export functionality
- Executive-level operational visibility

---

Track

Frontend Specialist — Track A

---

Tech Stack

Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

Backend & Database

- Supabase
- PostgreSQL
- Supabase RPC Functions

Data Visualization

- Recharts

Notifications

- Sonner

Deployment

- Vercel

---

Core Features

Enterprise Data Grid

- Server-side pagination
- Fetches exactly 50 records per request
- Supports 50,000+ inventory records
- Sortable columns
- Sticky table headers
- Responsive interface
- Color-coded inventory status indicators

Status Indicators

- In Stock
- Low Stock
- Out of Stock

---

Advanced Search & Filtering

Debounced Omnisearch

- 500ms debounce delay
- Prevents unnecessary API calls
- Optimized for large datasets

Inventory Filters

- Category dropdown
- Price range filters
- Stock-level slider
- Combined filtering support

---

Analytics Command Center

KPI Dashboard

- Total SKUs
- Total Inventory Value
- Out of Stock Items
- Low Stock Items

Restock Priority Chart

Displays the top 10 products with the lowest stock levels.

Portfolio Distribution Chart

Displays inventory valuation breakdown by category.

Database-Level Aggregation

Analytics calculations are performed using PostgreSQL RPC functions to minimize frontend processing and network payload size.

---

CSV Export Module

- One-click export
- Exports currently filtered inventory data
- Generates downloadable CSV reports
- Supports offline reporting workflows

---

Architecture Highlights

Server-Side Pagination

User requests page 3
→ Frontend calculates range(100,149)
→ Supabase returns 50 records
→ Browser renders only 50 rows
→ Smooth performance at scale

Debounced Search

User types "Wireless Headphones"
→ Debounce waits 500ms
→ Single query is executed
→ Reduces unnecessary requests
→ Improves efficiency

Database Aggregation

Frontend calls RPC function
→ PostgreSQL performs aggregation
→ Returns final KPI values
→ Minimal network payload
→ Faster analytics rendering

---

Performance Optimizations

- Handles 50,000+ inventory records efficiently
- Server-side pagination
- Database-level aggregation
- Debounced search
- Selective column fetching
- Reduced network payload size
- Optimized rendering performance

---

Folder Structure

aura-enterprise-engine/
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── analytics/
│   │   ├── KPICards.tsx
│   │   ├── StockBarChart.tsx
│   │   └── CategoryPieChart.tsx
│   │
│   ├── inventory/
│   │   ├── DataGrid.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── SearchBar.tsx
│   │   └── ExportButton.tsx
│   │
│   └── ui/
│       └── Pagination.tsx
│
├── hooks/
│   ├── useInventory.ts
│   ├── useAnalytics.ts
│   └── useDebounce.ts
│
├── lib/
│   ├── supabase.ts
│   └── exportCSV.ts
│
├── types/
│   └── inventory.ts
│
├── Prompts.md
└── README.md

---

Getting Started

Clone Repository

git clone https://github.com/vardhan999-hub/aura-enterprise-engine.git
cd aura-enterprise-engine

Install Dependencies

npm install

Start Development Server

npm run dev

Open:

http://localhost:3000

---

Environment Variables

Create a ".env.local" file in the project root:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

---

Database Setup

Run the provided SQL schema inside the Supabase SQL Editor.

This includes:

- Inventory table
- Database indexes
- Row Level Security configuration
- Sample inventory dataset
- KPI aggregation functions
- Category distribution functions

Dataset size:

50,000 Inventory Records

---

AI Assistance Documentation

AI-assisted engineering decisions and implementation notes are documented in:

Prompts.md

Topics covered include:

- Debounced search architecture
- Server-side pagination
- PostgreSQL RPC functions
- CSV export implementation

---

Performance Demonstration

The application demonstrates:

- 50 records fetched per request
- Server-side pagination
- Debounced search behavior
- Real-time analytics
- Interactive charts
- CSV export workflows

---

Engineer

Tadigadapa Harsha Vardhan

Frontend Intern — Prodesk IT

GitHub:
https://github.com/vardhan999-hub

LinkedIn:
https://www.linkedin.com/in/harshatadigadapa

---

License

This project was developed for educational, internship, and portfolio demonstration purposes.
