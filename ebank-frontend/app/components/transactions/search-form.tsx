'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/app/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { TransactionType } from '@/app/types/transaction.types'

const searchSchema = z.object({
  type: z.string().optional()
})

type SearchValues = z.infer<typeof searchSchema>

interface SearchFormProps {
  onSearch: (values: SearchValues) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const form = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      type: ''
    }
  })

  const onSubmit = (values: SearchValues) => {
    onSearch(values)
  }

  const clearSearch = () => {
    form.reset()
    onSearch({ type: '' })
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex w-full items-center space-x-2'
    >
      <div className='relative flex-1'>
        <Select
          onValueChange={(value) => form.setValue('type', value)}
          value={form.watch('type') || ''}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Filter by transaction type...' />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TransactionType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.watch('type') && (
          <button
            type='button'
            onClick={clearSearch}
            className='absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>
      <Button type='submit' size='icon'>
        <Search className='h-4 w-4' />
      </Button>
    </form>
  )
}
