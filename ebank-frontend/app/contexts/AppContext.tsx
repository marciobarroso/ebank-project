'use client'

import { createContext, useContext, useState } from 'react'

import { AppContext, AppProviderProps } from '@/app/types/app-context.types'

const AppContextInstance = createContext<AppContext | undefined>(undefined)

export function AppProvider({ children }: AppProviderProps) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AppContextInstance.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </AppContextInstance.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContextInstance)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
