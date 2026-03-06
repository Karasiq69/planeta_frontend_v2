import { Badge } from '@/components/ui/badge'
import { getStatusConfig } from '@/features/documents/lib/status-helper'

interface Props {
  status: string
  className?: string
}

export const DocumentStatusBadge = ({ status, className }: Props) => {
  const config = getStatusConfig(status)
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  )
}
