'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Plus } from 'lucide-react'

import { DataGrid } from '@/app/components/transactions/data-grid'
import { SearchForm } from '@/app/components/transactions/search-form'
import { Button } from '@/app/components/ui/button'
import { PageContainer } from '@/app/components/ui/page-container'

import { useTransaction } from '@/app/hooks/useTransactions'

export default function TransactionsPage() {
  const router = useRouter()
  const { transactions, getTransactions, page } = useTransaction()
  const [searchQuery, setSearchQuery] = useState<string>()

  const handleSearch = async ({ type }: { type?: string }) => {
    setSearchQuery(type)
    await getTransactions(type, 0) // Reset to first page on new search
  }

  const handlePageChange = async (pageNumber: number) => {
    await getTransactions(searchQuery, pageNumber)
  }

  return (
    <PageContainer
      title='Transaction'
      description='Search and manage your transactions and their information.'
      footer={
        <Button size='icon' onClick={() => router.push('/transactions/new')}>
          <Plus className='h-4 w-4' />
        </Button>
      }
    >
      <div className='space-y-4'>
        <SearchForm onSearch={handleSearch} />
        <DataGrid
          data={transactions}
          page={page}
          onPageChange={handlePageChange}
        />
      </div>
    </PageContainer>
  )
}
