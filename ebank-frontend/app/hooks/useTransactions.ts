import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useAppContext } from '@/app/contexts/AppContext'

import { PageInfo } from '@/app/types/data-grid.types'
import {
  Transaction,
  TransactionCreate,
  TransactionStatus,
  TransactionType
} from '@/app/types/transaction.types'

import { apiTransactions } from '@/app/lib/api'

const initialTransaction: Transaction = {
  id: 0,
  type: TransactionType.DEPOSIT,
  amount: 0,
  status: TransactionStatus.PENDING,
  createdAt: new Date()
}

export function useTransaction(id?: number) {
  const router = useRouter()
  const { setIsLoading } = useAppContext()
  const [transaction, setTransaction] =
    useState<Transaction>(initialTransaction)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [page, setPage] = useState<PageInfo>({
    size: 10,
    number: 0,
    totalElements: 0,
    totalPages: 0
  })

  const getTransactions = useCallback(
    async (type?: string, pageNumber: number = 1) => {
      try {
        setIsLoading(true)
        const searchParams = new URLSearchParams()
        if (type) {
          searchParams.append('type', type)
        }
        searchParams.append('page', pageNumber.toString())
        searchParams.append('size', '10')

        const { data } = await apiTransactions.get(
          `/api/v1/transactions?${searchParams.toString()}`
        )

        setTransactions(data.content)
        setPage(data.page)
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading]
  )

  const createTransaction = async (values: TransactionCreate) => {
    try {
      setIsLoading(true)
      await apiTransactions.post('/api/v1/transactions', values)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const readTransaction = useCallback(async () => {
    if (!id) return
    try {
      setIsLoading(true)
      const { data } = await apiTransactions.get(`/api/v1/transactions/${id}`)
      setTransaction(data)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [id, setIsLoading])

  const updateTransaction = async (values: Partial<Transaction>) => {
    try {
      setIsLoading(true)
      await apiTransactions.put(`/api/v1/transactions/${id}`, values)
      router.push(`/transactions/${id}`)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTransaction = async () => {
    try {
      setIsLoading(true)
      await apiTransactions.delete(`/api/v1/transactions/${id}`)
      router.push('/transactions')
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      readTransaction()
    } else {
      getTransactions()
    }
  }, [id, getTransactions, readTransaction])

  return {
    transaction,
    transactions,
    page,
    getTransactions,
    createTransaction,
    readTransaction,
    updateTransaction,
    deleteTransaction
  }
}
