'use client'

import { use } from 'react'

import PageHeader from '@/components/common/PageHeader'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useCashRegisterById } from '@/features/payments/api/queries'

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)
  const { data, isLoading } = useCashRegisterById(Number(id))

  if (isLoading) return <LoaderSectionAnimated className='rounded p-10' />

  return (
    <div className='space-y-6'>
      <PageHeader title={`Касса: ${data?.name ?? ''}`} showBackButton />

      <div className='rounded-lg bg-muted p-6'>
        <h4 className='mb-2 font-medium'>Основные настройки</h4>
        <p className='text-sm text-muted-foreground'>Раздел в разработке</p>
      </div>

      <div className='rounded-lg bg-muted p-6'>
        <h4 className='mb-2 font-medium'>Статистика</h4>
        <p className='text-sm text-muted-foreground'>Раздел в разработке</p>
      </div>
    </div>
  )
}

export default Page
