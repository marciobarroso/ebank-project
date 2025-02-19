'use client'

import { FooterActions } from '@/app/components/ui/footer-actions'

import { PageContainerProps } from '@/app/types/page-container.types'

import { cn } from '@/app/lib/utils'

export function PageContainer({
  children,
  title,
  description,
  footer,
  className
}: PageContainerProps) {
  return (
    <div id='page-container' className='flex h-full flex-col items-start'>
      {/* Header */}
      <div
        id='page-container-header'
        className='mb-6 w-full space-y-1 px-4 pt-6'
      >
        <h1 className='text-2xl font-semibold text-gray-900'>{title}</h1>
        {description && <p className='text-lm text-gray-500'>{description}</p>}
      </div>

      {/* Main content */}
      <div
        id='page-container-children'
        className={cn('w-full flex-1 px-4', className)}
      >
        <div className='w-full'>{children}</div>
      </div>

      {/* Footer */}
      {footer && (
        <div id='page-container-footer' className='mt-1 mt-auto w-full px-4'>
          <FooterActions>{footer}</FooterActions>
        </div>
      )}
    </div>
  )
}
