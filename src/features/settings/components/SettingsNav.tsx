'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { useOrganizationStore } from '@/stores/organization-store'

interface NavItem {
  label: string
  href?: string
  disabled?: boolean
}

interface NavGroup {
  title: string
  subtitle?: string
  items: NavItem[]
}

export default function SettingsNav() {
  const pathname = usePathname()
  const { organization } = useOrganizationStore()

  const groups: NavGroup[] = [
    {
      title: 'Организация',
      subtitle: organization?.name,
      items: [
        { label: 'Основное', href: '/settings/general' },
        { label: 'Сотрудники', href: '/settings/employees' },
        { label: 'Кассы', href: '/settings/cash-registers' },
        { label: 'Склады', href: '/settings/warehouses' },
        { label: 'Графики работы', disabled: true },
        { label: 'Нумерация документов', disabled: true },
        { label: 'Печатные формы', disabled: true },
      ],
    },
    {
      title: 'Общие',
      items: [
        { label: 'Услуги', href: '/settings/services' },
        { label: 'Шаблоны документов', href: '/settings/templates' },
        { label: 'Ставки НДС', href: '/settings/vat-rates' },
        { label: 'Пользователи', href: '/settings/users' },
        { label: 'Статусы заказов', disabled: true },
        { label: 'Роли и права', disabled: true },
        { label: 'Интеграции', disabled: true },
      ],
    },
  ]

  return (
    <nav className='w-56 shrink-0 space-y-6'>
      {groups.map((group) => (
        <div key={group.title} className='space-y-1'>
          <div className='px-3 py-2'>
            <h4 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
              {group.title}
            </h4>
            {group.subtitle && (
              <p className='mt-1.5 truncate rounded-md bg-primary/10 px-2 py-1 text-sm font-semibold text-primary'>
                {group.subtitle}
              </p>
            )}
          </div>
          {group.items.map((item) =>
            item.disabled ? (
              <span
                key={item.label}
                className='block cursor-not-allowed rounded-md px-3 py-2 text-sm text-muted-foreground/50'
              >
                {item.label}
              </span>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent',
                  pathname === item.href && 'bg-accent text-accent-foreground'
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      ))}
    </nav>
  )
}
