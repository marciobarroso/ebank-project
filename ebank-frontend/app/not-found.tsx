'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { CenteredContainer } from './components/ui/centered-container'

export default function NotFound() {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <CenteredContainer>
      <div className='flex flex-col items-center gap-8'>
        <div className='space-y-4 text-center'>
          <h1 className='text-6xl font-bold text-blue-600'>Error</h1>
          <h2 className='text-3xl font-semibold text-gray-900'>
            Ha ocurrido un error
          </h2>
          <p className='mx-auto max-w-md text-gray-600'>
            Lo sentimos, algo salió mal. Por favor, intente nuevamente.
          </p>
        </div>

        <div className='flex flex-col gap-4 sm:flex-row'>
          <Link
            href='/'
            className='inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700'
          >
            Ir al Inicio
          </Link>
          <button
            onClick={handleGoBack}
            className='inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50'
          >
            Intentar Nuevamente
          </button>
        </div>
      </div>
    </CenteredContainer>
  )
}
