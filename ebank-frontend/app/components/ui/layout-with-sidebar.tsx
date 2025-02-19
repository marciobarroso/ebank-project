'use client'

import { useState } from 'react'

import { cn } from '@/app/lib/utils'

import { MobileHeader } from './mobile-header'
import { Sidebar } from './sidebar'

interface LayoutWithSidebarProps {
  children: React.ReactNode
}

export function LayoutWithSidebar({ children }: LayoutWithSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false)

  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const toggleCollapse = () => setIsDesktopCollapsed(prev => !prev)

  return (
    <div className='relative min-h-screen'>
      <MobileHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 z-30 bg-gray-900 bg-opacity-50 transition-opacity sm:hidden'
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        isDesktopCollapsed={isDesktopCollapsed}
        onClose={closeMobileMenu}
        onToggleCollapse={toggleCollapse}
      />

      {/* Main content */}
      <main
        className={cn(
          'min-h-screen pt-16 transition-[margin] duration-300 ease-in-out',
          isDesktopCollapsed ? 'sm:ml-12' : 'sm:ml-64',
          'sm:pt-0'
        )}
      >
        {children}
      </main>
    </div>
  )
}
