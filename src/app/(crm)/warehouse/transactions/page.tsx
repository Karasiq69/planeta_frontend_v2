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

import PageLayout from '@/components/common/PageLayout'
import { DropdownMenuWithIcons } from '@/components/DropdownMenuWithIcons'
import { Button } from '@/components/ui/button'
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
    <PageLayout>
      <PageLayout.Header
        title='Движение товаров'
        actions={
          <div className='flex gap-5 items-center'>
            <DropdownMenuWithIcons items={dropdownItems}>
              <Button variant='default' size='sm'>
                <SquarePlus size={16} strokeWidth={2} aria-hidden='true' />
                Создать документ
              </Button>
            </DropdownMenuWithIcons>
            <Button variant='outline' size='sm' disabled>
              Что-то еще сделать
            </Button>
          </div>
        }
      />
      <PageLayout.Content>
        <Suspense>
          <StockMovementsDataTable />
        </Suspense>
      </PageLayout.Content>
    </PageLayout>
  )
}
export default Page
