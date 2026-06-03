import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { InventoryFilters, InventoryItem, SortField, SortOrder } from '@/types/inventory'

const PAGE_SIZE = 50

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [filters, setFilters] = useState<InventoryFilters>({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    maxStock: 500,
  })

  const fetchInventory = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('inventory')
        .select(`
          id,
          sku,
          name,
          category,
          price,
          stock_level,
          reorder_point,
          warehouse
        `, { count: 'exact' })

      if (filters.search.trim()) {
        query = query.ilike('name', `%${filters.search.trim()}%`)
      }

      if (filters.category) {
        query = query.eq('category', filters.category)
      }

      query = query
        .gte('price', filters.minPrice)
        .lte('price', filters.maxPrice)
        .lte('stock_level', filters.maxStock)
        .order(sortField, { ascending: sortOrder === 'asc' })

      const from = (page - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1
      query = query.range(from, to)

      const { data, count, error: fetchError } = await query

      if (fetchError) throw fetchError

      setItems(data as InventoryItem[] || [])
      setTotal(count || 0)
    } catch (err: any) {
      console.error('inventory fetch error:', err)
      setError('Failed to load inventory data')
    } finally {
      setLoading(false)
    }
  }, [filters, page, sortField, sortOrder])

  useEffect(() => {
    fetchInventory()
  }, [fetchInventory])

  useEffect(() => {
    setPage(1)
  }, [filters])

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  return {
    items,
    total,
    page,
    setPage,
    loading,
    error,
    filters,
    setFilters,
    sortField,
    sortOrder,
    handleSort,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(total / PAGE_SIZE),
  }
}