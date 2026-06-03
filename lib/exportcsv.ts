import { InventoryItem } from '@/types/inventory'

const HEADERS = ['SKU', 'Name', 'Category', 'Price ($)', 'Stock', 'Reorder Point', 'Warehouse', 'Supplier', 'Last Updated']

function escapeCell(val: string | number): string {
  const str = String(val)
  return str.includes(',') || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str
}

export function exportToCSV(data: InventoryItem[], filename = 'inventory-export') {
  if (!data.length) return

  const rows = data.map(item => [
    item.sku,
    item.name,
    item.category,
    item.price.toFixed(2),
    item.stock_level,
    item.reorder_point,
    item.warehouse,
    item.supplier,
    new Date(item.last_updated).toLocaleDateString(),
  ].map(escapeCell))

  const csv = [HEADERS.join(','), ...rows.map(r => r.join(','))].join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))

  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.csv`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}