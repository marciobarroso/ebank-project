'use client'

import { Menu } from 'lucide-react'

interface MobileHeaderProps {
  onMenuClick: () => void
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <div className='fixed left-0 right-0 top-0 z-30 border-b border-gray-200 bg-white sm:hidden'>
      <div className='flex h-16 items-center justify-between px-4'>
        <button
          onClick={onMenuClick}
          className='rounded-lg p-2 hover:bg-gray-100'
          aria-label='Open menu'
        >
          <Menu className='h-6 w-6' />
        </button>
      </div>
    </div>
  )
}
