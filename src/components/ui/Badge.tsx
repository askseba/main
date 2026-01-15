import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'default' | 'outline' | 'secondary'
  className?: string
  children: React.ReactNode
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        variant === 'outline' && 'border',
        className
      )}
    >
      {children}
    </span>
  )
}
