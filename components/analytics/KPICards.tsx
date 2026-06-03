'use client'
import { KPIData } from '@/hooks/useAnalytics'
import { Package, DollarSign, AlertTriangle, TrendingDown } from 'lucide-react'

interface KPICardsProps {
  data: KPIData
  loading: boolean
}

const skeletonCard = (
  <div className="bg-white rounded-2xl border border-slate-200 p-5">
    <div className="h-10 w-10 bg-slate-100 rounded-xl animate-pulse mb-3" />
    <div className="h-6 bg-slate-100 rounded animate-pulse mb-2 w-2/3" />
    <div className="h-4 bg-slate-100 rounded animate-pulse w-1/2" />
  </div>
)

export default function KPICards({ data, loading }: KPICardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {skeletonCard}{skeletonCard}{skeletonCard}{skeletonCard}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl border border-indigo-100 p-5">
        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-3">
          <Package size={20} />
        </div>
        <div className="text-2xl font-bold text-indigo-600 mb-1">{data.totalSKUs.toLocaleString()}</div>
        <div className="text-xs text-slate-500 font-medium">Total SKUs</div>
      </div>

      <div className="bg-white rounded-2xl border border-emerald-100 p-5">
        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
          <DollarSign size={20} />
        </div>
        <div className="text-2xl font-bold text-emerald-600 mb-1">${(data.totalValue / 1000000).toFixed(2)}M</div>
        <div className="text-xs text-slate-500 font-medium">Total Inventory Value</div>
      </div>

      <div className="bg-white rounded-2xl border border-red-100 p-5">
        <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-3">
          <AlertTriangle size={20} />
        </div>
        <div className="text-2xl font-bold text-red-600 mb-1">{data.outOfStock.toLocaleString()}</div>
        <div className="text-xs text-slate-500 font-medium">Out of Stock</div>
      </div>

      <div className="bg-white rounded-2xl border border-amber-100 p-5">
        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-3">
          <TrendingDown size={20} />
        </div>
        <div className="text-2xl font-bold text-amber-600 mb-1">{data.lowStock.toLocaleString()}</div>
        <div className="text-xs text-slate-500 font-medium">Low Stock Items</div>
      </div>
    </div>
  )
}