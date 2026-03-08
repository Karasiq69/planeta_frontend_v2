'use client'

import { useState } from 'react'

import PageLayout from '@/components/common/PageLayout'
import CreatePayrollDialog from '@/features/payrolls/components/CreatePayrollDialog'
import PayrollsTable from '@/features/payrolls/components/PayrollsTable'
import PayrollsYearFilter from '@/features/payrolls/components/PayrollsYearFilter'

const currentYear = new Date().getFullYear()

const Page = () => {
  const [year, setYear] = useState(currentYear)

  return (
    <PageLayout>
      <PageLayout.Header
        title='Зарплаты'
        actions={
          <>
            <CreatePayrollDialog />
            <PayrollsYearFilter year={year} onChange={setYear} />
          </>
        }
      />
      <PageLayout.Content>
        <PayrollsTable filters={{ year }} />
      </PageLayout.Content>
    </PageLayout>
  )
}

export default Page
