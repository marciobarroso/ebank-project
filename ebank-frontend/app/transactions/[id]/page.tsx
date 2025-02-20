'use client'

import { useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/app/components/ui/button'
import { FooterActions } from '@/app/components/ui/footer-actions'
import { Input } from '@/app/components/ui/input'
import { PageContainer } from '@/app/components/ui/page-container'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/components/ui/table'

import { useTransaction } from '@/app/hooks/useTransactions'

import { useAppContext } from '@/app/contexts/AppContext'

interface FeeDetail {
  description: string
  rate: string
  calculatedAmount: string
}

export default function TransactionViewPage() {
  const router = useRouter()
  const { id } = useParams()
  const { transaction } = useTransaction(Number(id))
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { isLoading } = useAppContext()

  const handleEdit = () => {
    router.push(`/transactions/${id}/edit`)
  }

  const formatMetadata = (metadata: string): FeeDetail[] => {
    try {
      const parsed = JSON.parse(metadata)
      // Assuming the metadata is an array of fee calculations
      return parsed.appliedRates.map((fee: any) => ({
        description: fee.description || '',
        rate:
          typeof fee.rate === 'number'
            ? `${(fee.rate * 100).toFixed(2)}%`
            : fee.rate || '',
        calculatedAmount:
          typeof fee.calculatedAmount === 'number'
            ? `$${fee.calculatedAmount.toFixed(2)}`
            : fee.calculatedAmount || ''
      }))
    } catch (e) {
      return []
    }
  }

  const transactionDetailsTab = (
    <>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <label htmlFor='id' className='text-sm font-medium text-gray-700'>
            ID
          </label>
          <Input
            id='id'
            value={transaction.id}
            disabled
            className='bg-gray-50'
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='type' className='text-sm font-medium text-gray-700'>
            Type
          </label>
          <Input
            id='type'
            value={transaction.type}
            disabled
            className='bg-gray-50'
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='amount' className='text-sm font-medium text-gray-700'>
            Original Amount
          </label>
          <Input
            id='amount'
            type='number'
            step='0.01'
            min='0.01'
            max='999999999.99'
            placeholder='0.00'
            value={transaction.amount?.toFixed(2)}
            disabled
            className='bg-gray-50'
          />
        </div>

        {transaction.status === 'PROCESSED' && (
          <div className='space-y-2'>
            <label
              htmlFor='calculatedFee'
              className='text-sm font-medium text-gray-700'
            >
              Fees Applied
            </label>
            <Input
              id='calculatedFee'
              type='number'
              step='0.01'
              min='0.01'
              max='999999999.99'
              placeholder='0.00'
              value={transaction.calculatedFee?.toFixed(2)}
              disabled
              className='bg-gray-50'
            />
          </div>
        )}

        {transaction.status === 'PROCESSED' && (
          <div className='space-y-2'>
            <label
              htmlFor='finalAmount'
              className='text-sm font-medium text-gray-700'
            >
              Final Amount
            </label>
            <Input
              id='finalAmount'
              type='number'
              step='0.01'
              min='0.01'
              max='999999999.99'
              placeholder='0.00'
              value={
                transaction.calculatedFee
                  ? (transaction.amount + transaction.calculatedFee).toFixed(2)
                  : transaction.amount?.toFixed(2)
              }
              disabled
              className='bg-gray-50'
            />
          </div>
        )}

        <div className='space-y-2'>
          <label htmlFor='status' className='text-sm font-medium text-gray-700'>
            Status
          </label>
          <Input
            id='status'
            value={transaction.status}
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
              new Date(transaction?.createdAt ?? new Date()),
              'dd/MM/yyyy HH:mm:ss'
            )}
            disabled
            className='bg-gray-50'
          />
        </div>

        {transaction.feeCalculationMetadata && (
          <div className='space-y-2'>
            <label
              htmlFor='feeCalculationMetadata'
              className='text-sm font-medium text-gray-700'
            >
              Rates Information
            </label>
            <div className='overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-gray-50'>
                    <TableHead className='w-[50%] font-semibold text-gray-900'>
                      Fee Description
                    </TableHead>
                    <TableHead className='w-[25%] font-semibold text-gray-900'>
                      Rate
                    </TableHead>
                    <TableHead className='w-[25%] font-semibold text-gray-900'>
                      Calculated Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formatMetadata(transaction.feeCalculationMetadata).length >
                  0 ? (
                      formatMetadata(transaction.feeCalculationMetadata).map(
                        (fee, index) => (
                          <TableRow key={index}>
                            <TableCell className='py-3 font-medium text-gray-900'>
                              {fee.description}
                            </TableCell>
                            <TableCell className='py-3 text-gray-600'>
                              {fee.rate}
                            </TableCell>
                            <TableCell className='py-3 text-gray-600'>
                              {fee.calculatedAmount}
                            </TableCell>
                          </TableRow>
                        )
                      )
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className='py-3 text-center text-gray-600'
                        >
                        No fees were applied to this transaction
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {transaction.feeCalculatedAt && (
          <div className='space-y-2'>
            <label
              htmlFor='feeCalculatedAt'
              className='text-sm font-medium text-gray-700'
            >
              Processed At
            </label>
            <Input
              id='feeCalculatedAt'
              value={format(
                new Date(transaction?.feeCalculatedAt ?? new Date()),
                'dd/MM/yyyy HH:mm:ss'
              )}
              disabled
              className='bg-gray-50'
            />
          </div>
        )}
      </div>
      <FooterActions>
        <Button
          variant='outline'
          onClick={() => router.push('/transactions')}
          size={'icon'}
        >
          <ArrowLeft className='h-4 w-4' />
        </Button>
      </FooterActions>
    </>
  )

  return (
    <PageContainer
      title='Transaction'
      description='View and manage your transaction details and notes'
    >
      {transactionDetailsTab}
    </PageContainer>
  )
}
