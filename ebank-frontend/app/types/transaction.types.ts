import { z } from 'zod'

export interface Transaction {
  id: number
  type: TransactionType
  amount: number
  calculatedFee?: number
  status: TransactionStatus
  createdAt?: Date
  feeCalculationMetadata?: string
  feeCalculatedAt?: Date
}

export interface TransactionCreate
  extends Omit<
    Transaction,
    | 'id'
    | 'createdAt'
    | 'feeCalculatedAt'
    | 'status'
    | 'calculatedFee'
    | 'feeCalculationMetadata'
  > {}

export interface TransactionUpdate extends Partial<TransactionCreate> {}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
  PAYMENT = 'PAYMENT'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED'
}

// Base Transaction Schema
export const TransactionSchema = z.object({
  id: z.number(),
  type: z.nativeEnum(TransactionType),
  amount: z
    .number()
    .positive('Amount must be greater than 0.01')
    .multipleOf(0.01, 'Amount cannot have more than 2 decimal places'),
  calculatedFee: z.number().optional(),
  status: z.nativeEnum(TransactionStatus),
  createdAt: z.date().optional(),
  feeCalculationMetadata: z.string().optional(),
  feeCalculatedAt: z.date().optional()
})

// Create Transaction Schema (matches TransactionCreate interface)
export const TransactionCreateSchema = TransactionSchema.omit({
  id: true,
  createdAt: true,
  feeCalculatedAt: true,
  status: true,
  calculatedFee: true,
  feeCalculationMetadata: true
})

// Type for form values
export type TransactionCreateValues = z.infer<typeof TransactionCreateSchema>
