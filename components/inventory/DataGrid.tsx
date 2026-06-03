'use client'
import { InventoryItem, SortField, SortOrder } from '@/types/inventory'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

interface DataGridProps {
  items: InventoryItem[]
  loading: boolean
  sortField: SortField
  sortOrder: SortOrder
  onSort: (field: SortField) => void
}

function StockBadge({ stock, reorder }: { stock: number; reorder: number }) {
  if (stock === 0) return (
    <span className="px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-600 rounded-full">
      Out of Stock
    </span>
  )
  if (stock <= reorder) return (
    <span className="px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-600 rounded-full">
      Low Stock
    </span>
  )
  return (
    <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-600 rounded-full">
      In Stock
    </span>
  )
}

function SortIcon({ field, sortField, sortOrder }: {
  field: SortField
  sortField: SortField
  sortOrder: SortOrder
}) {
  if (field !== sortField) return <ChevronsUpDown size={13} className="text-slate-300" />
  if (sortOrder === 'asc') return <ChevronUp size={13} className="text-indigo-500" />
  return <ChevronDown size={13} className="text-indigo-500" />
}

function SkeletonRow() {
  return (
    <tr className="border-b border-slate-100">
      {[1, 2, 3, 4, 5, 6, 7].map(i => (
        <td key={i} className="px-4 py-3">
          <div
            className="h-4 bg-slate-100 rounded animate-pulse"
            style={{ width: `${60 + (i * 7) % 40}%` }}
          />
        </td>
      ))}
    </tr>
  )
}

export default function DataGrid({ items, loading, sortField, sortOrder, onSort }: DataGridProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                SKU
              </th>
              <th
                scope="col"
                onClick={() => onSort('name')}
                className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer hover:text-indigo-500 transition-colors select-none"
              >
                <div className="flex items-center gap-1.5">
                  Product Name
                  <SortIcon field="name" sortField={sortField} sortOrder={sortOrder} />
                </div>
              </th>
              <th
                scope="col"
                onClick={() => onSort('category')}
                className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer hover:text-indigo-500 transition-colors select-none"
              >
                <div className="flex items-center gap-1.5">
                  Category
                  <SortIcon field="category" sortField={sortField} sortOrder={sortOrder} />
                </div>
              </th>
              <th
                scope="col"
                onClick={() => onSort('price')}
                className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer hover:text-indigo-500 transition-colors select-none"
              >
                <div className="flex items-center gap-1.5">
                  Price
                  <SortIcon field="price" sortField={sortField} sortOrder={sortOrder} />
                </div>
              </th>
              <th
                scope="col"
                onClick={() => onSort('stock_level')}
                className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer hover:text-indigo-500 transition-colors select-none"
              >
                <div className="flex items-center gap-1.5">
                  Stock Level
                  <SortIcon field="stock_level" sortField={sortField} sortOrder={sortOrder} />
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Warehouse
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-16 text-center">
                  <p className="text-slate-500 font-medium">No inventory items found</p>
                  <p className="text-slate-400 text-xs mt-1">Try adjusting your filters or search term</p>
                </td>
              </tr>
            ) : (
              items.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`border-b border-slate-100 hover:bg-indigo-50/30 transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{item.sku}</td>
                  <td className="px-4 py-3 font-medium text-slate-800 max-w-[200px] truncate">{item.name}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-lg">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-700">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-slate-600">{item.stock_level.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <StockBadge stock={item.stock_level} reorder={item.reorder_point} />
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{item.warehouse}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}