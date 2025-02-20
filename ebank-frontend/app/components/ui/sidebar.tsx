'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ChevronLeft, ChevronRight, Percent, Receipt } from 'lucide-react'

import { cn } from '@/app/lib/utils'

const menuItems = [
  { name: 'Transactions', href: '/transactions', icon: Receipt },
  { name: 'Rates', href: '/rates', icon: Percent }
]

interface SidebarProps {
  isMobileMenuOpen: boolean
  isDesktopCollapsed: boolean
  onClose: () => void
  onToggleCollapse: () => void
}

export function Sidebar({
  isMobileMenuOpen,
  isDesktopCollapsed,
  onClose,
  onToggleCollapse
}: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-gray-200 bg-white transition-all duration-300 ease-in-out',
        isDesktopCollapsed ? 'sm:w-12' : 'sm:w-64',
        isMobileMenuOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full',
        'sm:translate-x-0'
      )}
    >
      <div className='flex h-full flex-col overflow-y-auto py-4'>
        {/* Header with logo */}
        <div className='mb-5 flex items-center px-2'>
          <div className='flex items-center'>
            <Link href='/'>
              <div className='flex items-center'>
                {/* Mobile and collapsed desktop logo */}
                <Image
                  src='/images/e-bank-icon.png'
                  alt='e-bank'
                  width={30}
                  height={30}
                  priority={true}
                  className={cn(isDesktopCollapsed ? 'block' : 'hidden')}
                />
                {/* Desktop expanded logo */}
                <Image
                  src='/images/full-logo.png'
                  alt='e-bank'
                  width={120}
                  height={30}
                  priority={true}
                  className={cn(isDesktopCollapsed ? 'hidden' : 'block')}
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Navigation items */}
        <ul className='space-y-2 px-2 font-medium'>
          {/* Collapse menu item */}
          <li className='hidden sm:block'>
            <button
              onClick={onToggleCollapse}
              className={cn(
                'flex w-full items-center rounded-lg px-2 py-2 text-gray-900 hover:bg-gray-100',
                isDesktopCollapsed && 'justify-center'
              )}
            >
              {isDesktopCollapsed ? (
                <ChevronRight className='h-4 w-4' />
              ) : (
                <ChevronLeft className='h-4 w-4' />
              )}
            </button>
          </li>

          {menuItems.map(item => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => onClose()}
                className={cn(
                  'flex items-center rounded-lg px-2 py-2 hover:bg-gray-100',
                  isDesktopCollapsed && !isMobileMenuOpen && 'justify-center',
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-900'
                )}
                title={isDesktopCollapsed ? item.name : undefined}
              >
                <item.icon className='h-4 w-4' />
                <span
                  className={cn(
                    'ml-3 transition-opacity duration-300',
                    isDesktopCollapsed && 'sm:hidden'
                  )}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
