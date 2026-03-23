'use client'

import { ClipboardList, FileText, NotepadText, ShoppingCart } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDocumentsList } from '@/features/documents/api/queries'
import { useOrderProductsByOrderId } from '@/features/order-products/api/queries'
import { useOrderById, useOrderServicesById } from '@/features/orders/api/queries'
import DocumentsTabContent from '@/features/orders/components/order-tabs/order-documents/DocumentsTabContent'
import ProductsTabContent from '@/features/orders/components/order-tabs/order-products/productsTabContent'
import ServicesTabContent from '@/features/orders/components/order-tabs/order-services/servicesTabContent'
import { ApplySpecificationDialog } from '@/features/service-specifications/components/ApplySpecificationDialog'
import useLocalStorage from '@/hooks/use-local-storage'

import type { LucideIcon } from 'lucide-react'

interface TabConfig {
  id: string
  value: string
  label: string
  icon: LucideIcon
  children: React.ReactNode
}

const tabsConfig: TabConfig[] = [
  {
    id: 'works',
    value: 'services',
    label: 'Работы',
    icon: NotepadText,
    children: <ServicesTabContent />,
  },
  {
    id: 'parts',
    value: 'parts',
    label: 'Товары и Запчасти',
    icon: ShoppingCart,
    children: <ProductsTabContent />,
  },
  {
    id: 'documents',
    value: 'documents',
    label: 'Документы',
    icon: FileText,
    children: <DocumentsTabContent />,
  },
]

function TabCount({ count }: { count?: number }) {
  if (!count) return null
  return (
    <span className='ml-1 inline-flex items-center justify-center rounded-full bg-primary/10 px-1.5 text-[11px] font-semibold tabular-nums text-primary min-w-[1.25rem] h-5'>
      {count}
    </span>
  )
}

const OrdersTabsWrapper = () => {
  const { id } = useParams()
  const orderId = Number(id)
  const [orderTab, setOrderTab] = useLocalStorage('preferred_order_tabs', tabsConfig[0].value)
  const [specDialogOpen, setSpecDialogOpen] = useState(false)

  const { data: order } = useOrderById(orderId)
  const { data: services } = useOrderServicesById(orderId)
  const { data: products } = useOrderProductsByOrderId(orderId)
  const { data: documents } = useDocumentsList({ orderId })

  const canApplySpec = order && ['APPLICATION', 'ORDER', 'IN_PROGRESS'].includes(order.status)

  const counts: Record<string, number | undefined> = {
    services: services?.length,
    parts: products?.length,
    documents: documents?.meta?.total,
  }

  return (
    <Tabs
      value={orderTab}
      className='w-full bg-muted rounded-lg p-2 border'
      onValueChange={setOrderTab}
    >
      <div className='flex items-center justify-between gap-2'>
        <TabsList className='flex items-start justify-start h-auto p-0 gap-1'>
          {tabsConfig.map((tab) => {
            const Icon = tab.icon
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.value}
                className='flex gap-2 rounded-md hover:bg-background/70 items-center h-10 border border-transparent data-[state=active]:border-border'
              >
                <Icon size={16} />
                {tab.label}
                <TabCount count={counts[tab.value]} />
              </TabsTrigger>
            )
          })}
        </TabsList>

        <Button
          size='sm'
          variant='outline'
          disabled={!canApplySpec}
          onClick={() => setSpecDialogOpen(true)}
        >
          <ClipboardList size={16} />
          Применить спецификацию
        </Button>
      </div>

      {tabsConfig.map((tab) => (
        <TabsContent key={tab.id} value={tab.value}>
          {tab.children}
        </TabsContent>
      ))}

      <ApplySpecificationDialog
        orderId={orderId}
        open={specDialogOpen}
        onOpenChange={setSpecDialogOpen}
      />
    </Tabs>
  )
}

export default OrdersTabsWrapper
