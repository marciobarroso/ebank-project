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

import { RateCreateSchema, RateCreateValues } from '@/app/types/rate.type'
import { TransactionType } from '@/app/types/transaction.types'

export type RateFormValues = z.infer<typeof RateCreateSchema>

interface RateFormProps {
  onSubmit: (values: RateFormValues) => Promise<void>
  isLoading?: boolean
}

export function RateForm({ onSubmit, isLoading }: RateFormProps) {
  const form = useForm<RateCreateValues>({
    resolver: zodResolver(RateCreateSchema),
    defaultValues: {
      type: TransactionType.DEPOSIT,
      rate: 0,
      description: '',
      active: true
    }
  })

  const handleSubmit = async (values: RateFormValues) => {
    try {
      await onSubmit(values)
      form.reset()
      toast.success('Rate created successfully')
    } catch (error) {
      toast.error('Error creating rate')
      throw error
    }
  }

  return (
    <form
      id='rate-form'
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
            <SelectValue placeholder='Select rate type' />
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
        <label htmlFor='rate' className='text-sm font-medium text-gray-700'>
          Rate
        </label>
        <Input
          id='rate'
          type='number'
          step='0.01'
          min='0.01'
          max='999999999.99'
          placeholder='0.00'
          {...form.register('rate', { valueAsNumber: true })}
          disabled={isLoading}
        />
        {form.formState.errors.rate && (
          <p className='text-sm text-red-500'>
            {form.formState.errors.rate.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <label
          htmlFor='description'
          className='text-sm font-medium text-gray-700'
        >
          Description
        </label>
        <Input
          id='description'
          type='text'
          placeholder='Enter description'
          {...form.register('description')}
          disabled={isLoading}
        />
        {form.formState.errors.description && (
          <p className='text-sm text-red-500'>
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
          <input
            type='checkbox'
            {...form.register('active')}
            disabled={isLoading}
            className='rounded border-gray-300 text-primary focus:ring-primary'
          />
          Active
        </label>
        {form.formState.errors.active && (
          <p className='text-sm text-red-500'>
            {form.formState.errors.active.message}
          </p>
        )}
      </div>
    </form>
  )
}
