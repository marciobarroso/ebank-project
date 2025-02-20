'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'

import { RateForm } from '@/app/components/rates/rate-form'
import { Button } from '@/app/components/ui/button'
import { PageContainer } from '@/app/components/ui/page-container'

import { useRate } from '@/app/hooks/useRates'

import { useAppContext } from '@/app/contexts/AppContext'

import { RateCreateValues } from '@/app/types/rate.type'

export default function NewRatePage() {
  const router = useRouter()
  const { isLoading } = useAppContext()
  const { createRate } = useRate()
  const [error, setError] = useState('')

  const handleSubmit = async (values: RateCreateValues) => {
    try {
      await createRate(values)
      toast.success('Rate created successfully')
      router.push('/rates')
    } catch (error) {
      toast.error('Failed to create rate')
      setError('Failed to create rate')
    }
  }

  return (
    <PageContainer
      title='New Rate'
      description='Create a new rate'
      footer={
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            onClick={() => router.push('/rates')}
            size={'icon'}
          >
            <ArrowLeft className='h-4 w-4' />
          </Button>
          <Button
            type='submit'
            form='rate-form'
            disabled={isLoading}
            size={'icon'}
          >
            {isLoading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Save className='h-4 w-4' />
            )}
          </Button>
        </div>
      }
    >
      <RateForm onSubmit={handleSubmit} isLoading={isLoading} />
    </PageContainer>
  )
}
