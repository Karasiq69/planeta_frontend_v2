'use client'

import { useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import PaymentsFilters from '@/features/payments/components/PaymentsFilters'
import PaymentsTable from '@/features/payments/components/PaymentsTable'

import type { PaymentsQueryParams } from '@/features/payments/types'

const Page = () => {
  const [filters, setFilters] = useState<PaymentsQueryParams>({})

  return (
    <section className="flex flex-col h-full">
      <div className='space-y-5 shrink-0'>
        <PageHeader title='Платежи' showBackButton={false} />
        <div className='flex gap-3'>
          <PaymentsFilters filters={filters} onChange={setFilters} />
        </div>
      </div>
      <Card className="mt-5 flex-1 min-h-0 flex flex-col">
        <PaymentsTable filters={filters} />
      </Card>
    </section>
  )
}

export default Page
