import { Transaction } from '@/app/types/transaction.types'

export interface PageInfo {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

export interface DataGridProps {
  data: Transaction[]
  page: PageInfo
  onPageChange: (page: number) => void
}
