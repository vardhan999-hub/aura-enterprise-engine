'use client'
import { InventoryFilters } from '@/types/inventory'
import { SlidersHorizontal } from 'lucide-react'

const CATEGORIES = ['', 'Electronics', 'Computers', 'Accessories', 'Furniture', 'Apparel', 'Sports', 'Home', 'Security']

const labelCls = 'text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5'
const inputCls = 'w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-indigo-400 transition-colors'

interface FilterPanelProps {
  filters: InventoryFilters
  onChange: (filters: InventoryFilters) => void
}

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const update = (patch: Partial<InventoryFilters>) => onChange({ ...filters, ...patch })

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal size={16} className="text-indigo-500" />
        <h3 className="text-sm font-semibold text-slate-700">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className={labelCls}>Category</label>
          <select
            value={filters.category}
            onChange={e => update({ category: e.target.value })}
            className={inputCls + ' bg-white'}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat || 'All'}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Min Price ($)</label>
          <input
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={e => update({ minPrice: Number(e.target.value) })}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Max Price ($)</label>
          <input
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={e => update({ maxPrice: Number(e.target.value) })}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>
            Max Stock — <span className="text-indigo-500 font-bold">{filters.maxStock}</span>
          </label>
          <input
            type="range"
            min={0}
            max={500}
            value={filters.maxStock}
            onChange={e => update({ maxStock: Number(e.target.value) })}
            className="w-full accent-indigo-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0</span>
            <span>500</span>
          </div>
        </div>
      </div>
    </div>
  )
}