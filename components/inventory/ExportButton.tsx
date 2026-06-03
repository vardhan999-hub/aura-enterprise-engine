'use client'
import { Download } from 'lucide-react'
import { InventoryItem } from '@/types/inventory'
import { exportToCSV } from '@/lib/exportcsv'

interface ExportButtonProps {
  data: InventoryItem[]
  total: number
}

export default function ExportButton({ data, total }: ExportButtonProps) {
  const handleExport = () => {
    exportToCSV(data, 'aura-inventory')
  }

  return (
    <button
      onClick={handleExport}
      disabled={data.length === 0}
      className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors"
    >
      <Download size={15} />
      Export CSV
      <span className="bg-emerald-600 px-1.5 py-0.5 rounded-md text-xs">
        {data.length}
      </span>
    </button>
  )
}