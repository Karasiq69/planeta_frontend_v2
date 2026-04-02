import React from 'react'

import PageHeader from '@/components/common/PageHeader'
import ClientContentWrapper from '@/features/clients/components/ClientContentWrapper'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Клиент' }

type Props = {
  params: Promise<{
    id: string
  }>
}

const Page = async (props: Props) => {
  const params = await props.params
  return (
    <div className="space-y-5">
      <PageHeader title={`Клиент #${params.id}`} showBackButton />
      <ClientContentWrapper clientId={params.id} />
    </div>
  )
}

export default Page
