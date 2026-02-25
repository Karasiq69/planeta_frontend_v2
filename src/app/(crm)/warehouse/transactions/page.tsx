'use client'
import {
  ArrowLeftRight,
  BookX,
  FileMinus2,
  FilePlus2,
  Layers2,
  SquarePlus,
} from 'lucide-react'
import React, { Suspense } from 'react'

import PageHeader from '@/components/common/PageHeader'
import { DropdownMenuWithIcons } from '@/components/DropdownMenuWithIcons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import StockMovementsDataTable from '@/features/stock-movements/components/table/stock-movements/StockMovementsDataTable'
import { INVENTORY_DOCUMENTS_URL, WAREHOUSE_URL } from '@/lib/constants'

import type { DropdownWithIconMenuItem } from '@/components/DropdownMenuWithIcons';

const dropdownItems: DropdownWithIconMenuItem[] = [
  {
    key: 'new-receipt',
    title: 'Приход',
    icon: FilePlus2,
    url: `${WAREHOUSE_URL}/new-receipt`,
  },
  {
    key: 'expense',
    title: 'Расход',
    icon: FileMinus2,
    url: `${WAREHOUSE_URL}/expense`,
  },
  {
    key: 'transfer',
    title: 'Перемещение',
    icon: ArrowLeftRight,
    url: `${INVENTORY_DOCUMENTS_URL}/transfer`,
  },
  {
    key: 'write-off',
    title: 'Списание',
    icon: BookX,
    url: `${WAREHOUSE_URL}/write-off`,
  },
  {
    key: 'leftovers',
    title: 'Остатки',
    icon: Layers2,
    url: `${WAREHOUSE_URL}/leftovers`,
  },
]

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <div className="space-y-5 shrink-0">
        <PageHeader title="Движение товаров" showBackButton={false} />
        <div className="flex gap-5 items-center">
          <DropdownMenuWithIcons items={dropdownItems}>
            <Button variant='default'>
              <SquarePlus size={16} strokeWidth={2} aria-hidden='true' />
              Создать документ
            </Button>
          </DropdownMenuWithIcons>
          <Button variant="outline" disabled>
            Что-то еще сделать
          </Button>
        </div>
      </div>
      <Card className="mt-5 flex-1 min-h-0 flex flex-col">
        <Suspense>
          <StockMovementsDataTable />
        </Suspense>
      </Card>
    </section>
  )
}
export default Page
