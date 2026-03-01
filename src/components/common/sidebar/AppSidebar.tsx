'use client'
import {
  BookDashed,
  BriefcaseBusiness,
  Calendar,
  Car,
  Files,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
  Warehouse,
  Banknote,
} from 'lucide-react'
import * as React from 'react'

import { NavBottom } from '@/components/common/sidebar/nav-bottom'
import { NavIntro } from '@/components/common/sidebar/nav-intro'
import { NavMain } from '@/components/common/sidebar/nav-main'
import { NavUser } from '@/components/common/sidebar/nav-user'
import { NavWarehouse } from '@/components/common/sidebar/nav-warehouse'
import { TeamSwitcher } from '@/components/common/sidebar/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'



const data = {
  intro: [
    {
      title: 'Календарь',
      url: '/calendar',
      icon: Calendar,
    },
    {
      title: 'Дашборд',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
  ],
  navMain: [
    {
      title: 'Заявки на ремонт',
      url: '/applications',
      icon: BookDashed,
    },
    {
      title: 'Заказ-наряды',
      url: '/orders',
      icon: FileText,
    },
    {
      title: 'Клиенты',
      url: '/clients',
      icon: Users,
    },
    {
      title: 'Автомобили',
      url: '/cars',
      icon: Car,
    },
    {
      title: 'Платежи',
      url: '/payments',
      icon: Wallet,
    },
    {
      title: 'Зарплаты',
      url: '/payrolls',
      icon: Banknote,
    },
  ],
  navBottom: [
    {
      title: 'Настройки',
      url: '/settings',
      icon: Settings,
    },
    {
      title: 'Помощь',
      url: '/help',
      icon: HelpCircle,
    },
  ],
  // warehouse: [
  //     {
  //         name: "Склад",
  //         url: "/warehouse",
  //         icon: Warehouse,
  //     },
  //     {
  //         name: "Движения товаров",
  //         url: "/warehouse/transactions",
  //         icon: ArrowRight,
  //     },
  //     {
  //         name: "Накладные",
  //         url: "/inventory-documents",
  //         icon: ClipboardList,
  //     },
  //     {
  //         name: "Номенклатура",
  //         url: "/products",
  //         icon: FileSpreadsheet,
  //     },
  // ],
  organizations: [
    {
      name: 'Организации',
      url: '/organizations',
      icon: BriefcaseBusiness,
    },
  ],
  products: [
    {
      title: 'Товары и запчасти',
      url: '/products',
      icon: ShoppingCart,
    },
  ],
  documents: [
    {
      title: 'Документы',
      url: '#',
      icon: Files,
      isActive: true,
      items: [
        {
          title: 'Приходные накладные',
          url: '/documents/receipt',
        },
        {
          title: 'Перемещения товаров',
          url: '/documents/transfer',
        },
        {
          title: 'Расходные документы',
          url: '/documents/expense',
        },
        {
          title: 'Списания',
          url: '/documents/write-off',
        },
      ],
    },
  ],
  warehouse: [
    {
      title: 'Склад',
      url: '#',
      icon: Warehouse,
      isActive: true,
      items: [
        {
          title: 'Товары на складе',
          url: '/warehouse',
        },
        {
          title: '--Движения товаров',
          url: '/warehouse/transactions',
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props} variant="sidebar">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavIntro items={data.intro} />
        <NavMain items={data.navMain} />
        <NavIntro items={data.products} />
        <NavWarehouse items={data.documents} />
        <NavWarehouse items={data.warehouse} />

        <NavBottom items={data.navBottom} className='mt-auto' />
      </SidebarContent>
      {/*<SidebarContent>*/}
      {/*  <NavMain/>*/}

      {/*  <NavSettings/>*/}
      {/*</SidebarContent>*/}

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
