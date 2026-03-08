import React from 'react'

import { Card } from '@/components/ui/card'

import PageHeader from './PageHeader'

import type { PageHeaderProps } from './PageHeader'

function PageLayout({ children }: { children: React.ReactNode }) {
  return <section className='flex flex-col h-full'>{children}</section>
}

function Header(props: PageHeaderProps) {
  return <PageHeader {...props} />
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <Card className='mt-5 flex-1 min-h-0 flex flex-col'>
      {children}
    </Card>
  )
}

PageLayout.Header = Header
PageLayout.Content = Content

export default PageLayout
