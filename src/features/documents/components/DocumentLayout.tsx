
import PageHeader from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/badge'
import { getStatusConfig } from '@/features/documents/lib/status-helper'

import type { ReactNode } from 'react'

interface Props {
  title: string
  status: string
  header: ReactNode
  actions?: ReactNode
  children: ReactNode
}

const DocumentLayout = ({ title, status, header, actions, children }: Props) => {
  const statusConfig = getStatusConfig(status)

  return (
    <section className='flex flex-col h-full'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between gap-4'>
          <PageHeader
            title={title}
            showBackButton
            elements={[<Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>]}
          />
          {actions && <div className='flex items-center gap-2 shrink-0'>{actions}</div>}
        </div>
        {header}
      </div>
      <div className='mt-4 flex-1 min-h-0'>{children}</div>
    </section>
  )
}

export default DocumentLayout
