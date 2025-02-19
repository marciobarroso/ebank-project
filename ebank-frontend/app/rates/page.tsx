'use client'

import { useRouter } from 'next/navigation'

import { Plus } from 'lucide-react'

import { DataGrid } from '@/app/components/prospects/data-grid'
import { SearchForm } from '@/app/components/prospects/search-form'
import { Button } from '@/app/components/ui/button'
import { PageContainer } from '@/app/components/ui/page-container'

import { useProspect } from '@/app/hooks/useProspect'

export default function ProspectsPage() {
  const router = useRouter()
  const { prospects, getProspects } = useProspect()

  const handleSearch = async ({ query }: { query?: string }) => {
    await getProspects(query)
  }

  return (
    <PageContainer
      title='Prospects'
      description='Search and manage your prospects and their information.'
      footer={
        <Button size='icon' onClick={() => router.push('/prospects/new')}>
          <Plus className='h-4 w-4' />
        </Button>
      }
    >
      <div className='space-y-4'>
        <SearchForm onSearch={handleSearch} />
        <DataGrid data={prospects} />
      </div>
    </PageContainer>
  )
} 