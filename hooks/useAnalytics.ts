import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface KPIData {
  totalSKUs: number
  totalValue: number
  outOfStock: number
  lowStock: number
}

export interface CategoryData {
  category: string
  value: number
  percentage: number
}

export interface LowStockItem {
  name: string
  stock_level: number
  reorder_point: number
  sku: string
}

export function useAnalytics() {
  const [kpis, setKpis] = useState<KPIData>({
    totalSKUs: 0,
    totalValue: 0,
    outOfStock: 0,
    lowStock: 0,
  })
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const [kpiRes, categoryRes, lowStockRes] = await Promise.all([
          supabase.rpc('get_inventory_kpis'),
          supabase.rpc('get_category_distribution'),
          supabase
            .from('inventory')
            .select('name, sku, stock_level, reorder_point')
            .order('stock_level', { ascending: true })
            .limit(10),
        ])

        if (kpiRes.data) setKpis(kpiRes.data as KPIData)
        if (categoryRes.data) setCategoryData(categoryRes.data as CategoryData[])
        if (lowStockRes.data) setLowStockItems(lowStockRes.data as LowStockItem[])

      } catch (err) {
        console.error('Analytics fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  return { kpis, categoryData, lowStockItems, loading }
}