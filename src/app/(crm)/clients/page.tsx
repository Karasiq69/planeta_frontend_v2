import React, { Suspense } from 'react'

import PageLayout from '@/components/common/PageLayout'
import CreateClientButton from '@/features/clients/components/CreateClientButton'
import ClientsDataTable from '@/features/clients/components/table/ClientsDataTable'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Клиенты' }

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  return (
    <PageLayout>
      <PageLayout.Header title='Клиенты' actions={<CreateClientButton />} />
      <PageLayout.Content>
        <Suspense>
          <ClientsDataTable />
        </Suspense>
      </PageLayout.Content>
    </PageLayout>
  )
}
export default Page
