import PayrollDetailPage from '@/features/payrolls/components/PayrollDetailPage'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Зарплатная ведомость' }

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  return <PayrollDetailPage payrollId={Number(id)} />
}

export default Page
