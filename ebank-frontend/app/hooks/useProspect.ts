import { useCallback, useState } from 'react'

import { useRouter } from 'next/navigation'

import axios from 'axios'
import { toast } from 'sonner'

import { useAppContext } from '@/app/contexts/AppContext'

import { Prospect } from '@/app/types/rate.type'

export function useProspect(id?: string) {
  const router = useRouter()
  const { setIsLoading } = useAppContext()
  const [prospects, setProspects] = useState<Prospect[]>([])

  const getProspects = useCallback(
    async (query?: string) => {
      try {
        setIsLoading(true)
        const searchParams = new URLSearchParams()
        if (query) {
          searchParams.append('query', query)
        }

        const { data } = await axios.get(
          `/api/prospects?${searchParams.toString()}`
        )
        setProspects(data.items)
      } catch (error) {
        console.error('Error loading prospects:', error)
        toast.error('Failed to load prospects')
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading]
  )

  const createProspect = async (
    values: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      setIsLoading(true)
      await axios.post('/api/prospects', values)
      toast.success('Prospect created successfully')
      return true
    } catch (error) {
      console.error('Error creating prospect:', error)
      toast.error(
        error instanceof Error ? error.message : 'Failed to create prospect'
      )
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    prospects,
    getProspects,
    createProspect
  }
}
