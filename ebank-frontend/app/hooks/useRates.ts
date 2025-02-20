import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useAppContext } from '@/app/contexts/AppContext'

import { PageInfo } from '@/app/types/data-grid.types'
import { Rate, RateCreateValues } from '@/app/types/rate.type'
import { TransactionType } from '@/app/types/transaction.types'

import { apiRates } from '@/app/lib/api'

const initialRate: Rate = {
  id: 0,
  type: TransactionType.DEPOSIT,
  rate: 0,
  description: '',
  active: true,
  createdAt: new Date()
}

export function useRate(id?: number) {
  const router = useRouter()
  const { setIsLoading } = useAppContext()
  const [rate, setRate] = useState<Rate>(initialRate)
  const [rates, setRates] = useState<Rate[]>([])
  const [page, setPage] = useState<PageInfo>({
    size: 10,
    number: 0,
    totalElements: 0,
    totalPages: 0
  })

  const getRates = useCallback(
    async (type?: string, description?: string, pageNumber: number = 1) => {
      try {
        setIsLoading(true)
        const searchParams = new URLSearchParams()
        if (type) {
          searchParams.append('type', type)
        }
        if (description) {
          searchParams.append('description', description)
        }
        searchParams.append('page', pageNumber.toString())
        searchParams.append('size', '10')

        const { data } = await apiRates.get(
          `/api/v1/rates?${searchParams.toString()}`
        )

        setRates(data.content)
        setPage(data.page)
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading]
  )

  const createRate = async (values: RateCreateValues) => {
    try {
      setIsLoading(true)
      await apiRates.post('/api/v1/rates', values)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const readRate = useCallback(async () => {
    if (!id) return
    try {
      setIsLoading(true)
      const { data } = await apiRates.get(`/api/v1/rates/${id}`)
      setRate(data)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [id, setIsLoading])

  useEffect(() => {
    if (id) {
      readRate()
    } else {
      getRates()
    }
  }, [id, getRates, readRate])

  return {
    rate,
    rates,
    getRates,
    createRate,
    readRate,
    page
  }
}
