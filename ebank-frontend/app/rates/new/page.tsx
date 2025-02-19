'use client'

import { useRouter } from 'next/navigation'

import { ArrowLeft, Loader2, Save } from 'lucide-react'

import { ProspectForm } from '@/app/components/prospects/prospect-form'
import { Button } from '@/app/components/ui/button'
import { PageContainer } from '@/app/components/ui/page-container'

import { useProspect } from '@/app/hooks/useProspect'

import { useAppContext } from '@/app/contexts/AppContext'
import { Prospect } from '@/app/types/rate.type'

export default function NewProspectPage() {
  const router = useRouter()
  const { createProspect } = useProspect()
  const { isLoading, setIsLoading } = useAppContext()

  const handleSubmit = async (
    values: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const success = await createProspect(values)
    if (success) {
      router.push('/prospects')
    }
  }

  return (
    <PageContainer
      title='New Prospect'
      description='Create a new prospect.'
      footer={
        <>
          <Button
            variant='outline'
            onClick={() => router.push('/prospects')}
            size='icon'
          >
            <ArrowLeft className='h-4 w-4' />
          </Button>
          <Button
            type='submit'
            form='prospect-form'
            disabled={isLoading}
            size={'icon'}
          >
            {isLoading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Save className='h-4 w-4' />
            )}
          </Button>
        </>
      }
    >
      <ProspectForm onSubmit={handleSubmit} />
    </PageContainer>
  )
} 