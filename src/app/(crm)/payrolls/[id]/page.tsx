import PayrollDetailPage from '@/features/payrolls/components/PayrollDetailPage'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  return <PayrollDetailPage payrollId={Number(id)} />
}

export default Page
