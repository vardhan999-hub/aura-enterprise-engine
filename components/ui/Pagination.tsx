'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
}

const btnCls = 'px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'

function getPageWindow(page: number, totalPages: number): number[] {
  const total = Math.min(5, totalPages)
  let start = page - 2
  if (start < 1) start = 1
  if (start + total - 1 > totalPages) start = totalPages - total + 1
  return Array.from({ length: total }, (_, i) => start + i)
}

export default function Pagination({ page, totalPages, total, pageSize, onPageChange }: PaginationProps) {
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)
  const pages = getPageWindow(page, totalPages)

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">
      <p className="text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-700">{start}–{end}</span> of{' '}
        <span className="font-semibold text-slate-700">{total.toLocaleString()}</span>
      </p>

      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(1)} disabled={page === 1} className={btnCls}>
          First
        </button>
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className={btnCls}>
          <ChevronLeft size={13} />
        </button>

        {pages.map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              page === p
                ? 'bg-indigo-500 text-white border-indigo-500'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {p}
          </button>
        ))}

        <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} className={btnCls}>
          <ChevronRight size={13} />
        </button>
        <button onClick={() => onPageChange(totalPages)} disabled={page === totalPages} className={btnCls}>
          Last
        </button>
      </div>
    </div>
  )
}