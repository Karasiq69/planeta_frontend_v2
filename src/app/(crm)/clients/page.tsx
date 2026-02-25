import React, { Suspense } from 'react'

import { Card } from '@/components/ui/card'
import CreateClientButton from '@/features/clients/components/CreateClientButton'
import ClientsDataTable from '@/features/clients/components/table/ClientsDataTable'

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  return (
    <section className="flex flex-col h-full">
      <div className="space-y-5 shrink-0">
        <h3>Клиенты</h3>
        <CreateClientButton />
      </div>
      <Card className="mt-5 flex-1 min-h-0 flex flex-col">
        <Suspense>
          <ClientsDataTable />
        </Suspense>
      </Card>
    </section>
  )
}
export default Page
