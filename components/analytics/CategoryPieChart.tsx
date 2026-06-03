'use client'

import { CategoryData } from '@/hooks/useAnalytics'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

// chart colors
const COLORS = [
  '#6366f1',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#84cc16',
  '#f97316',
]

interface CategoryPieChartProps {
  data: CategoryData[]
  loading: boolean
}

export default function CategoryPieChart({
  data,
  loading,
}: CategoryPieChartProps) {

  // loading skeleton
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="h-5 w-48 bg-slate-100 rounded animate-pulse mb-4" />
        <div className="h-56 bg-slate-50 rounded-xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">

      {/* heading */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800">
          📊 Portfolio Distribution
        </h3>

        <p className="text-xs text-slate-400 mt-0.5">
          Inventory value breakdown by category
        </p>
      </div>

      {/* chart */}
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="45%"
            outerRadius={90}
            innerRadius={50}
            dataKey="value"
            nameKey="category"

            // percentage labels
            label={(props: any) =>
              `${props.percentage ?? 0}%`
            }

            labelLine={false}
          >

            {/* chart slices */}
            {data.map((entry, index) => (
              <Cell
                key={entry.category}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          {/* tooltip */}
          <Tooltip
            formatter={(value: any) => [ `$${(Number(value) / 1000).toFixed(1)}K`,
            'Value',
          ]}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
            }}
          />

          {/* legend */}
          <Legend
            formatter={(value) => (
              <span style={{ fontSize: 11 }}>
                {value}
              </span>
            )}
          />

        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}