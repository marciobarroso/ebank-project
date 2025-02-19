'use client'

import { cn } from '@/app/lib/utils'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/components/ui/table'

import { useAppContext } from '@/app/contexts/AppContext'
import { DataGridProps } from '@/app/types/data-grid.types'


export function DataGrid({ data, page, onPageChange }: DataGridProps) {
  const router = useRouter()
  const { isLoading } = useAppContext()

  const handleRowClick = (transactionId: number) => {
    router.push(`/transactions/${transactionId}`)
  }

  return (
    <div className='space-y-4'>
      <div className='overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow className='bg-gray-50'>
              <TableHead className='w-[200px] font-semibold text-gray-900'>
                Type
              </TableHead>
              <TableHead className='w-[150px] font-semibold text-gray-900'>
                Amount
              </TableHead>
              <TableHead className='w-[120px] font-semibold text-gray-900'>
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className='h-32 text-center text-gray-500'>
                  <p>No transactions found</p>
                </TableCell>
              </TableRow>
            ) : (
              data.map(transaction => (
                <TableRow
                  key={transaction.id}
                  onClick={() => handleRowClick(transaction.id)}
                  className='cursor-pointer transition-colors hover:bg-gray-50'
                >
                  <TableCell className='py-3 font-medium text-gray-900'>
                    {transaction.type}
                  </TableCell>
                  <TableCell className='py-3 text-gray-600'>
                    {transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className='py-3 text-gray-600'>
                    {transaction.status}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
        <div className='flex flex-1 justify-between sm:hidden'>
          <button
            onClick={() => onPageChange(page.number + 1 - 1)}
            disabled={page.number + 1 === 1}
            className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(page.number + 1 + 1)}
            disabled={page.number + 1 >= page.totalPages}
            className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
          >
            Next
          </button>
        </div>
        <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-700'>
              Showing{' '}
              <span className='font-medium'>
                {(page.number + 1) * page.size - page.size + 1}
              </span>{' '}
              to{' '}
              <span className='font-medium'>
                {Math.min((page.number + 1) * page.size, page.totalElements)}
              </span>{' '}
              of <span className='font-medium'>{page.totalElements}</span> results
            </p>
          </div>
          <div>
            <nav
              className='isolate inline-flex -space-x-px rounded-md shadow-sm'
              aria-label='Pagination'
            >
              <button
                onClick={() => onPageChange(page.number + 1 - 1)}
                disabled={page.number + 1 === 1}
                className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50'
              >
                <span className='sr-only'>Previous</span>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              </button>

              {[...Array(page.totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => onPageChange(index + 1)}
                  className={cn(
                    'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0',
                    page.number === index
                      ? 'z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                      : 'text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => onPageChange(page.number + 1 + 1)}
                disabled={page.number + 1 >= page.totalPages}
                className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50'
              >
                <span className='sr-only'>Next</span>
                <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
