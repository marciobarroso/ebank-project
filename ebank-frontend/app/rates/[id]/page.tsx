'use client'

import { useParams, useRouter } from 'next/navigation'

import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/app/components/ui/button'
import { FooterActions } from '@/app/components/ui/footer-actions'
import { Input } from '@/app/components/ui/input'
import { PageContainer } from '@/app/components/ui/page-container'

import { useRate } from '@/app/hooks/useRates'

export default function RateViewPage() {
  const router = useRouter()
  const { id } = useParams()
  const { rate } = useRate(Number(id))

  const handleEdit = () => {
    router.push(`/rates/${id}/edit`)
  }

  const rateDetailsTab = (
    <>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <label htmlFor='id' className='text-sm font-medium text-gray-700'>
            ID
          </label>
          <Input id='id' value={rate.id} disabled className='bg-gray-50' />
        </div>

        <div className='space-y-2'>
          <label htmlFor='type' className='text-sm font-medium text-gray-700'>
            Type
          </label>
          <Input id='type' value={rate.type} disabled className='bg-gray-50' />
        </div>

        <div className='space-y-2'>
          <label htmlFor='rate' className='text-sm font-medium text-gray-700'>
            Rate
          </label>
          <Input
            id='rate'
            type='string'
            step='0.01'
            min='0.01'
            max='999999999.99'
            placeholder='0.00'
            value={`${(rate.rate * 100).toFixed(2)}\%`}
            disabled
            className='bg-gray-50'
          />
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
            value={rate.description}
            disabled
            className='bg-gray-50'
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='active' className='text-sm font-medium text-gray-700'>
            Active
          </label>
          <Input
            id='active'
            value={rate.active ? 'Yes' : 'No'}
            disabled
            className='bg-gray-50'
          />
        </div>

        <div className='space-y-2'>
          <label
            htmlFor='createdAt'
            className='text-sm font-medium text-gray-700'
          >
            Created At
          </label>
          <Input
            id='createdAt'
            value={format(
              new Date(rate?.createdAt ?? new Date()),
              'dd/MM/yyyy HH:mm:ss'
            )}
            disabled
            className='bg-gray-50'
          />
        </div>
      </div>
      <FooterActions>
        <Button
          variant='outline'
          onClick={() => router.push('/rates')}
          size={'icon'}
        >
          <ArrowLeft className='h-4 w-4' />
        </Button>
      </FooterActions>
    </>
  )

  return (
    <PageContainer
      title='Rate'
      description='View and manage your rate details and notes'
    >
      {rateDetailsTab}
    </PageContainer>
  )
}
