import { TransactionType } from '@/app/types/transaction.types'

export interface Rate {
  id: number
  type: TransactionType
  rate: number
  description: string
  active: boolean
  createdAt: Date
}
