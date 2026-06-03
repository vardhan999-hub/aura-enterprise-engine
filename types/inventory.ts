export type Category =
  | 'Electronics'
  | 'Computers'
  | 'Accessories'
  | 'Furniture'
  | 'Apparel'
  | 'Sports'
  | 'Home'
  | 'Security'

export type SortField = 'name' | 'price' | 'stock_level' | 'category'
export type SortOrder = 'asc' | 'desc'

export interface InventoryItem {
  id: string
  sku: string
  name: string
  category: Category
  price: number
  stock_level: number
  reorder_point: number
  warehouse: string
  supplier: string
  last_updated: string
}

export interface InventoryFilters {
  search: string
  category: string
  minPrice: number
  maxPrice: number
  maxStock: number
}

export interface PaginationState {
  page: number
  pageSize: number
  total: number
}

export interface InventoryResponse {
  data: InventoryItem[]
  total: number
  error?: string
}