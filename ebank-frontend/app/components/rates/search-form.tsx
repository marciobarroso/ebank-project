'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/components/ui/select'

import { RateSearchSchema, RateSearchValues } from '@/app/types/rate.type'
import { TransactionType } from '@/app/types/transaction.types'

interface SearchFormProps {
  onSearch: (values: RateSearchValues) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const form = useForm<RateSearchValues>({
    resolver: zodResolver(RateSearchSchema)
  })

  const onSubmit = (values: RateSearchValues) => {
    onSearch(values)
  }

  const handleClear = () => {
    form.reset()
    onSearch({})
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex items-center gap-2'
    >
      <div className='relative flex-1'>
        <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Search rates...'
          {...form.register('description')}
          className='pl-8'
        />
        {form.watch('description') && (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute right-0 top-0'
            onClick={handleClear}
          >
            <X className='h-4 w-4' />
          </Button>
        )}
      </div>
      <div className='relative flex-1'>
        <Select
          onValueChange={value =>
            form.setValue('type', value as TransactionType)
          }
          value={form.watch('type') || ''}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Filter by type...' />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TransactionType).map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.watch('type') && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>
      <Button type='submit'>Search</Button>
    </form>
  )
}
