interface FooterActionsProps {
  children: React.ReactNode
  className?: string
}

export function FooterActions({ children, className }: FooterActionsProps) {
  return (
    <div id='footer-actions' className='mt-1 mt-auto w-full py-6'>
      <div className='w-full'>
        <div className='flex items-center justify-start gap-3'>{children}</div>
      </div>
    </div>
  )
}
