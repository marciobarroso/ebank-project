export interface PageInfo {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

export interface DataGridProps<T> {
  data: T[]
  page: PageInfo
  onPageChange: (page: number) => void
}
