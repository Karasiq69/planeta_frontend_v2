import React from 'react'

import PageHeader from '@/components/common/PageHeader'
import MainCalendar from '@/features/appointments/MainCalendar'

type Props = {}
const Page = (props: Props) => {
  return (
    <section>
      <div className="space-y-5">
        <PageHeader title="Календарь" />

        <>
          <MainCalendar />
        </>
      </div>
    </section>
  )
}
export default Page
