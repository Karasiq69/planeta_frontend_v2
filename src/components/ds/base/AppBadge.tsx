import { Badge, type BadgeProps } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const colorVariantMap = {
  success: { variant: 'success' as const },
  warning: { variant: 'warning' as const },
  error: { variant: 'destructive' as const },
  info: { variant: 'info' as const },
  neutral: { variant: 'light' as const },
} as const

type ColorVariant = keyof typeof colorVariantMap

interface AppBadgeProps extends BadgeProps {
  colorVariant?: ColorVariant
}

function AppBadge({ colorVariant, variant, className, ...props }: AppBadgeProps) {
  const resolvedVariant = colorVariant
    ? colorVariantMap[colorVariant].variant
    : variant

  return <Badge variant={resolvedVariant} className={cn(className)} {...props} />
}

export { AppBadge, type AppBadgeProps, type ColorVariant }
