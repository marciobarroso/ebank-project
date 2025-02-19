'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { ArrowLeft, Loader2, Save } from 'lucide-react'

import { TransactionForm } from '@/app/components/transactions/transaction-form'
import { Button } from '@/app/components/ui/button'
import { PageContainer } from '@/app/components/ui/page-container'

import { useTransaction } from '@/app/hooks/useTransactions'

import { useAppContext } from '@/app/contexts/AppContext'
import { TransactionType } from '@/app/types/transaction.types'
import { toast } from 'sonner'

interface TransactionFormValues {
  type: TransactionType
  amount: number
}

export default function NewTransactionPage() {
  const router = useRouter()
  const { isLoading } = useAppContext()
  const { createTransaction } = useTransaction()
  const [error, setError] = useState('')

  const handleSubmit = async (values: TransactionFormValues) => {
    try {
      await createTransaction(values)
      toast.success('Transaction created successfully')
      router.push('/transactions')
    } catch (error) {
      toast.error('Failed to create transaction')
      setError('Failed to create transaction')
    }
  }

  return (
    <PageContainer
      title='New Transaction'
      description='Create a new transaction'
      footer={
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            onClick={() => router.push('/transactions')}
            size={'icon'}
          >
            <ArrowLeft className='h-4 w-4' />
          </Button>
          <Button
            type='submit'
            form='transaction-form'
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
      <TransactionForm onSubmit={handleSubmit} isLoading={isLoading} />
    </PageContainer>
  )
}
