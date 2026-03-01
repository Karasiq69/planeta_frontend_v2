import Link from 'next/link'

import PageHeader from '@/components/common/PageHeader'
import OrganizationSection from '@/features/settings/components/OrganizationSection'
import { cn } from '@/lib/utils'

const Page = () => {
  const navItems = [
    { label: 'Организация', href: '/settings', active: true },
    { label: 'Сотрудники', href: '/settings/employees' },
  ]

  return (
    <div className='space-y-6'>
      <PageHeader title='Настройки' />

      <div className='flex gap-8'>
        <nav className='w-48 shrink-0 space-y-1'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                item.active && 'bg-muted'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='flex-1'>
          <OrganizationSection />
        </div>
      </div>
    </div>
  )
}

export default Page
