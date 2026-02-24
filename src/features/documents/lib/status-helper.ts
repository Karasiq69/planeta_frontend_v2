import { DocumentStatus } from '@/features/documents/lib/constants'

import type { BadgeProps } from '@/components/ui/badge'

interface StatusConfig {
	label: string
	variant: BadgeProps['variant']
}

const documentStatusConfig: Record<string, StatusConfig> = {
	[DocumentStatus.DRAFT]: {
		label: 'Черновик',
		variant: 'warning',
	},
	[DocumentStatus.CONFIRMED]: {
		label: 'Проведён',
		variant: 'success',
	},
	[DocumentStatus.CANCELLED]: {
		label: 'Отменён',
		variant: 'destructive',
	},
}

export const getStatusConfig = (status: string): StatusConfig => {
	return (
		documentStatusConfig[status] || {
			label: status?.toLowerCase(),
			variant: 'info' as StatusConfig['variant'],
		}
	)
}
