'use client'
import { LowStockItem } from '@/hooks/useAnalytics'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'

interface StockBarChartProps {
  data: LowStockItem[]
  loading: boolean
}

export default function StockBarChart({ data, loading }: StockBarChartProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="h-5 bg-slate-100 rounded animate-pulse w-48 mb-4" />
        <div className="h-56 bg-slate-50 rounded-xl animate-pulse" />
      </div>
    )
  }

  const chartData = data.map(item => ({
    name: item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name,
    stock: item.stock_level,
    reorder: item.reorder_point,
    sku: item.sku,
  }))

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800">Restock Priority</h3>
        <p className="text-xs text-slate-400 mt-0.5">Top 10 products with lowest stock levels</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20 }}>
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={130} />
          <Tooltip
            formatter={(value, name) => [value, name === 'stock' ? 'Stock Level' : 'Reorder Point']}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <ReferenceLine x={20} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Min', fontSize: 10 }} />
          <Bar dataKey="stock" radius={[0, 4, 4, 0]} maxBarSize={18}>
            {chartData.map((entry) => (
              <Cell
                key={entry.sku}
                fill={entry.stock === 0 ? '#ef4444' : entry.stock <= entry.reorder ? '#f59e0b' : '#6366f1'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}