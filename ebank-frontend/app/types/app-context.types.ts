import { ReactNode } from 'react'

export interface AppContext {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export interface AppProviderProps {
  children: ReactNode
}
