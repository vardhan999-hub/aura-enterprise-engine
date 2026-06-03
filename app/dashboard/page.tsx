'use client'
import { useState, useEffect } from 'react'
import { useInventory } from '@/hooks/useInventory'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useDebounce } from '@/hooks/useDebounce'
import DataGrid from '@/components/inventory/DataGrid'
import FilterPanel from '@/components/inventory/FilterPanel'
import SearchBar from '@/components/inventory/SearchBar'
import ExportButton from '@/components/inventory/ExportButton'
import Pagination from '@/components/ui/Pagination'
import KPICards from '@/components/analytics/KPICards'
import StockBarChart from '@/components/analytics/StockBarChart'
import CategoryPieChart from '@/components/analytics/CategoryPieChart'
import { LayoutDashboard, Package, BarChart3, RefreshCw } from 'lucide-react'

type Tab = 'inventory' | 'analytics'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('inventory')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const {
    items, total, page, setPage,
    loading, error,
    filters, setFilters,
    sortField, sortOrder, handleSort,
    pageSize, totalPages,
  } = useInventory()

  const { kpis, categoryData, lowStockItems, loading: analyticsLoading } = useAnalytics()

  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearch }))
  }, [debouncedSearch])

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Package size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900">Aura Enterprise Engine</h1>
              <p className="text-xs text-slate-400">Apex Logistics — Inventory Command Center</p>
            </div>
          </div>
          <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full font-medium">
            {total.toLocaleString()} SKUs loaded
          </span>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 flex gap-1">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'inventory'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <LayoutDashboard size={15} /> Inventory Grid
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'analytics'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <BarChart3 size={15} /> Command Center
          </button>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-6 space-y-5">
        {activeTab === 'inventory' && (
          <>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <SearchBar value={search} onChange={setSearch} />
              </div>
              <ExportButton data={items} total={total} />
            </div>

            <FilterPanel filters={filters} onChange={setFilters} />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <RefreshCw size={14} /> {error}
              </div>
            )}

            <DataGrid
              items={items}
              loading={loading}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
            />

            {!loading && total > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  total={total}
                  pageSize={pageSize}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}

        {activeTab === 'analytics' && (
          <>
            <KPICards data={kpis} loading={analyticsLoading} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <StockBarChart data={lowStockItems} loading={analyticsLoading} />
              <CategoryPieChart data={categoryData} loading={analyticsLoading} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}