import React from 'react'

import GoBackButton from '@/components/common/GoBackButton'

import type { ReactNode } from 'react';

export type PageHeaderProps = {
  title: string
  showBackButton?: boolean
  elements?: ReactNode[]
  actions?: ReactNode
  className?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = false,
  elements = [],
  actions,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap gap-5 items-center ${className}`}>
      {showBackButton && <GoBackButton />}

      <h3>{title}</h3>

      {elements.map((element, index) => (
        <React.Fragment key={`header-element-${index}`}>{element}</React.Fragment>
      ))}

      {actions && (
        <div className='ml-auto flex flex-wrap items-center gap-3'>
          {actions}
        </div>
      )}
    </div>
  )
}

export default PageHeader
