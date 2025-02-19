'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'

const searchSchema = z.object({
  query: z.string().optional()
})

type SearchValues = z.infer<typeof searchSchema>

interface SearchFormProps {
  onSearch: (values: SearchValues) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const form = useForm<SearchValues>({
    resolver: zodResolver(searchSchema)
  })

  const onSubmit = (values: SearchValues) => {
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
          placeholder='Search prospects...'
          {...form.register('query')}
          className='pl-8'
        />
        {form.watch('query') && (
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
      <Button type='submit'>Search</Button>
    </form>
  )
} 