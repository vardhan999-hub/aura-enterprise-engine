# Aura Enterprise Engine

Enterprise-grade inventory management dashboard built for handling **50,000+ SKUs** with high-performance search, filtering, analytics, and export capabilities.

Designed as a commercial-scale frontend system for logistics and retail operations.

---

## Live Demo

https://aura-enterprise-engine-peach.vercel.app/dashboard

---

# Project Overview

Aura Enterprise Engine is a modern inventory command center developed for large-scale warehouse and retail operations.

The platform solves a critical performance problem:
traditional spreadsheet-based systems and legacy ERP dashboards freeze when attempting to render massive datasets.

This solution introduces:

- Server-side pagination
- Debounced database search
- Real-time analytics dashboards
- Interactive inventory filtering
- CSV export functionality
- Enterprise-grade UI/UX

---

# Core Features

## Enterprise Inventory Grid

- Handles **50,000+ inventory records**
- Server-side pagination (50 rows per request)
- Sortable columns
- Sticky table headers
- Responsive UI
- Status badges:
  - In Stock
  - Low Stock
  - Out of Stock

---

## Advanced Filtering

### Global Search
- 500ms debounced search
- Prevents unnecessary API calls
- Optimized for large datasets

### Filters
- Category dropdown
- Price range filtering
- Stock-level slider filtering

---

## Analytics Command Center

### KPI Cards
- Total SKUs
- Total Inventory Value
- Out of Stock Items
- Low Stock Items

### Interactive Charts
- Restock Priority Bar Chart
- Portfolio Distribution Pie Chart

Built using Recharts.

---

## CSV Export Module

Warehouse managers can export currently filtered inventory data into CSV format for:
- supplier reports
- offline analysis
- procurement workflows

---

# Tech Stack

## Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS

## Backend / Database
- Supabase
- PostgreSQL
- SQL RPC Functions

## Charts & Visualization
- Recharts

## Deployment
- Vercel

---

# Performance Optimizations

## Server-Side Pagination

Only 50 records are fetched per request.

Example:

```ts
query.range(from, to)
```

This prevents the browser from rendering all 50,000 rows simultaneously.

---

## Debounced Search

Search requests wait 500ms before querying the database.

```ts
const debouncedSearch = useDebounce(rawSearch, 500)
```

Reduces unnecessary network traffic and improves responsiveness.

---

## Database-Level Aggregation

Analytics calculations are handled directly inside PostgreSQL using RPC functions.

### Example RPC

```sql
CREATE OR REPLACE FUNCTION get_inventory_kpis()
```

This avoids transferring massive datasets to the browser.

---

# Folder Structure

```bash
app/
components/
hooks/
lib/
types/
public/
```

### Important Modules

| Folder | Purpose |
|---|---|
| `components/` | Reusable UI components |
| `hooks/` | Custom React hooks |
| `lib/` | Utility functions & Supabase client |
| `types/` | Shared TypeScript interfaces |
| `app/` | Next.js App Router pages |

---

# Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/aura-enterprise-engine.git
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Application runs at:

```bash
http://localhost:3000
```

---

# Database Setup

Run the provided SQL schema inside Supabase SQL Editor.

Includes:
- Inventory table
- Indexes
- RLS policy
- Sample dataset generation
- KPI aggregation functions

Dataset size:
- 50,000 inventory records

---

# Commercial Architecture Highlights

## Scalability
Designed for enterprise-scale inventory systems.

## Performance
Optimized network payloads and rendering strategy.

## Maintainability
Modular architecture with reusable components and hooks.

## UX
Fast, responsive, and data-dense enterprise dashboard interface.

---

# Demonstrated Enterprise Features

- Server-side pagination
- Database-driven analytics
- Large dataset handling
- Optimized filtering/search
- CSV reporting workflows
- Real-time dashboard analytics

---

# Author

**Tadigadapa Harsha Vardhan**  
Junior Software Engineer  
Prodesk IT

---

# License

This project is built for educational and portfolio demonstration purposes.
