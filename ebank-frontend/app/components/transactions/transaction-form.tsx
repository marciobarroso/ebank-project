'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Input } from '@/app/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/components/ui/select'

import {
  TransactionCreateSchema,
  TransactionCreateValues,
  TransactionType
} from '@/app/types/transaction.types'

export type TransactionFormValues = z.infer<typeof TransactionCreateSchema>

interface TransactionFormProps {
  onSubmit: (values: TransactionFormValues) => Promise<void>
  isLoading?: boolean
}

export function TransactionForm({ onSubmit, isLoading }: TransactionFormProps) {
  const form = useForm<TransactionCreateValues>({
    resolver: zodResolver(TransactionCreateSchema),
    defaultValues: {
      type: TransactionType.DEPOSIT,
      amount: 0
    }
  })

  const handleSubmit = async (values: TransactionFormValues) => {
    try {
      await onSubmit(values)
      form.reset()
      toast.success('Transaction created successfully')
    } catch (error) {
      toast.error('Error creating transaction')
      throw error
    }
  }

  return (
    <form
      id='transaction-form'
      onSubmit={form.handleSubmit(handleSubmit)}
      className='space-y-6'
    >
      <div className='space-y-2'>
        <label htmlFor='type' className='text-sm font-medium text-gray-700'>
          Type
        </label>
        <Select
          onValueChange={value =>
            form.setValue('type', value as TransactionType)
          }
          defaultValue={form.getValues('type')}
          disabled={isLoading}
        >
          <SelectTrigger id='type' className='w-full'>
            <SelectValue placeholder='Select transaction type' />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TransactionType).map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.type && (
          <p className='text-sm text-red-500'>
            {form.formState.errors.type.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <label htmlFor='amount' className='text-sm font-medium text-gray-700'>
          Amount
        </label>
        <Input
          id='amount'
          type='number'
          step='0.01'
          min='0.01'
          max='999999999.99'
          placeholder='0.00'
          {...form.register('amount', { valueAsNumber: true })}
          disabled={isLoading}
        />
        {form.formState.errors.amount && (
          <p className='text-sm text-red-500'>
            {form.formState.errors.amount.message}
          </p>
        )}
      </div>
    </form>
  )
}
