'use client'

import { useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import CreatePayrollDialog from '@/features/payrolls/components/CreatePayrollDialog'
import PayrollsTable from '@/features/payrolls/components/PayrollsTable'
import PayrollsYearFilter from '@/features/payrolls/components/PayrollsYearFilter'

const currentYear = new Date().getFullYear()

const Page = () => {
  const [year, setYear] = useState(currentYear)

  return (
    <section className='flex flex-col h-full'>
      <div className='space-y-5 shrink-0'>
        <PageHeader title='Зарплаты' showBackButton={false} />
        <div className='flex gap-3'>
          <CreatePayrollDialog />
          <PayrollsYearFilter year={year} onChange={setYear} />
        </div>
      </div>
      <Card className='mt-5 flex-1 min-h-0 flex flex-col'>
        <PayrollsTable filters={{ year }} />
      </Card>
    </section>
  )
}

export default Page
