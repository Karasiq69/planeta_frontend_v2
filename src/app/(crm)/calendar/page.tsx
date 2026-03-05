import React from 'react'

import PageHeader from '@/components/common/PageHeader'
import MainCalendar from '@/features/appointments/MainCalendar'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Календарь' }

type Props = {}
const Page = (props: Props) => {
  return (
    <section>
      <div className='space-y-5'>
        <PageHeader title='Календарь' />

        <>
          <MainCalendar />
        </>
      </div>
    </section>
  )
}
export default Page
