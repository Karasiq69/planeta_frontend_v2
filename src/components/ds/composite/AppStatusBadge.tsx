import { AppBadge, type ColorVariant } from '../base/AppBadge'

interface StatusConfig {
  label: string
  colorVariant: ColorVariant
}

const defaultStatusMap: Record<string, StatusConfig> = {
  new: { label: 'Новый', colorVariant: 'info' },
  draft: { label: 'Черновик', colorVariant: 'neutral' },
  active: { label: 'Активный', colorVariant: 'success' },
  in_progress: { label: 'В работе', colorVariant: 'warning' },
  completed: { label: 'Завершён', colorVariant: 'success' },
  cancelled: { label: 'Отменён', colorVariant: 'error' },
}

interface AppStatusBadgeProps {
  status: string
  statusMap?: Record<string, StatusConfig>
  className?: string
}

function AppStatusBadge({ status, statusMap, className }: AppStatusBadgeProps) {
  const mergedMap = { ...defaultStatusMap, ...statusMap }
  const config = mergedMap[status]

  return (
    <AppBadge
      colorVariant={config?.colorVariant ?? 'neutral'}
      className={className}
    >
      {config?.label ?? status}
    </AppBadge>
  )
}

export { AppStatusBadge, type AppStatusBadgeProps, type StatusConfig }
