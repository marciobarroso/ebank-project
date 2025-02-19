'use client'

import { Loader2 } from 'lucide-react'

import { useAppContext } from '@/app/contexts/AppContext'

export function LoadingOverlay() {
  const { isLoading } = useAppContext()

  if (!isLoading) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-[1px]'>
      <Loader2 className='h-8 w-8 animate-spin text-gray-500' />
    </div>
  )
}
