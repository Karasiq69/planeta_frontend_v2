import PageHeader from '@/components/common/PageHeader'
import SettingsNav from '@/features/settings/components/SettingsNav'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Настройки' }

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='space-y-6'>
      <PageHeader title='Настройки' />
      <div className='flex gap-8'>
        <SettingsNav />
        <div className='flex-1 min-w-0'>{children}</div>
      </div>
    </div>
  )
}
