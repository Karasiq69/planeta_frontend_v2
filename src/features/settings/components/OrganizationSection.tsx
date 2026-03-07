'use client'

import { Banknote, Building2, ChevronRight, Warehouse } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    title: 'Организации',
    description: 'Управление организациями',
    href: '/settings/organizations',
    icon: Building2,
  },
  {
    title: 'Кассы',
    description: 'Управление кассами организации',
    href: '/settings/cash-registers',
    icon: Banknote,
  },
  {
    title: 'Склады',
    description: 'Управление складами и цехами',
    href: '/settings/warehouses',
    icon: Warehouse,
  },
]

const OrganizationSection = () => {
  return (
    <div className='space-y-4'>
      <h4 className='text-lg font-medium'>Организация</h4>
      <div className='grid gap-3'>
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className='flex items-center justify-between rounded-lg border border-border/60 bg-card p-4 shadow-sm transition-colors hover:bg-accent'
          >
            <div className='flex items-center gap-3'>
              <section.icon className='size-5 text-muted-foreground' />
              <div>
                <div className='font-medium'>{section.title}</div>
                <div className='text-sm text-muted-foreground'>{section.description}</div>
              </div>
            </div>
            <ChevronRight className='size-4 text-muted-foreground' />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default OrganizationSection
