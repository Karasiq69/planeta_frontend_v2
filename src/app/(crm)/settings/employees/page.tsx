import EmployeesPage from '@/features/employees/components/EmployeesPage'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Сотрудники' }

const Page = () => {
  return <EmployeesPage />
}

export default Page
