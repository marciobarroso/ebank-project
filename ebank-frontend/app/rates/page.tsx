'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Plus } from 'lucide-react'

import { DataGrid } from '@/app/components/rates/data-grid'
import { SearchForm } from '@/app/components/rates/search-form'
import { Button } from '@/app/components/ui/button'
import { PageContainer } from '@/app/components/ui/page-container'

import { useRate } from '@/app/hooks/useRates'

import { RateSearchValues } from '@/app/types/rate.type'

export default function RatesPage() {
  const router = useRouter()
  const { rates, getRates, page } = useRate()
  const [searchQuery, setSearchQuery] = useState<RateSearchValues>()

  const handleSearch = async (values: RateSearchValues) => {
    setSearchQuery(values)
    await getRates(values.type, values.description)
  }

  const handlePageChange = async (pageNumber: number) => {
    await getRates(searchQuery?.type, searchQuery?.description, pageNumber)
  }

  return (
    <PageContainer
      title='Rates'
      description='Search and manage your rates and their information.'
      footer={
        <Button size='icon' onClick={() => router.push('/rates/new')}>
          <Plus className='h-4 w-4' />
        </Button>
      }
    >
      <div className='space-y-4'>
        <SearchForm onSearch={handleSearch} />
        <DataGrid data={rates} page={page} onPageChange={handlePageChange} />
      </div>
    </PageContainer>
  )
}
