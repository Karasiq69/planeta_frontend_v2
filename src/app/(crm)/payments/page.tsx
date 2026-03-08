'use client'

import { useState } from 'react'

import PageLayout from '@/components/common/PageLayout'
import PaymentsFilters from '@/features/payments/components/PaymentsFilters'
import PaymentsTable from '@/features/payments/components/PaymentsTable'

import type { PaymentsQueryParams } from '@/features/payments/types'

const Page = () => {
  const [filters, setFilters] = useState<PaymentsQueryParams>({})

  return (
    <PageLayout>
      <PageLayout.Header
        title='Платежи'
        actions={<PaymentsFilters filters={filters} onChange={setFilters} />}
      />
      <PageLayout.Content>
        <PaymentsTable filters={filters} />
      </PageLayout.Content>
    </PageLayout>
  )
}

export default Page
