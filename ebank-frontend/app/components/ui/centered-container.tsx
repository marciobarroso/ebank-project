import { CenteredContainerProps } from '@/app/types/centered-container.types'

export function CenteredContainer({
  children,
  className = ''
}: CenteredContainerProps) {
  return (
    <div
      className={`flex min-h-screen items-center justify-center ${className}`}
    >
      <div className='w-full px-4'>{children}</div>
    </div>
  )
}
