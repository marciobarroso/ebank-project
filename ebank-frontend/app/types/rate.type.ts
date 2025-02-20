import { z } from 'zod'

import { TransactionType } from '@/app/types/transaction.types'

export interface Rate {
  id: number
  type: TransactionType
  rate: number
  description: string
  active: boolean
  createdAt: Date
}

export interface RateCreate extends Omit<Rate, 'id' | 'createdAt'> {}

export interface RateUpdate extends Partial<RateCreate> {}

// Base Rate Schema
export const RateSchema = z.object({
  id: z.number(),
  type: z.nativeEnum(TransactionType),
  rate: z
    .number()
    .positive('Amount must be greater than 0.01')
    .multipleOf(0.01, 'Amount cannot have more than 2 decimal places'),
  description: z.string().optional(),
  active: z.boolean().optional(),
  createdAt: z.date()
})

// Create Rate Schema (matches RateCreate interface)
export const RateCreateSchema = RateSchema.omit({
  id: true,
  createdAt: true
})

// Type for form values
export type RateCreateValues = z.infer<typeof RateCreateSchema>

export const RateSearchSchema = z.object({
  type: z.nativeEnum(TransactionType).optional(),
  description: z.string().optional()
})

export type RateSearchValues = z.infer<typeof RateSearchSchema>
