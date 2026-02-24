'use client'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React, { useMemo } from 'react'

import DataTableBasic from '@/components/common/table/data-table-basic'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAddTransferDocumentItem } from '@/features/inventory-documents/transfer/api/mutations'
import { useTransferDocument, useTransferDocumentItems } from '@/features/inventory-documents/transfer/api/queries'
import { TransferItemsColumnsDefs } from '@/features/inventory-documents/transfer/components/table/items/columns-items'
import TransferItemsCombobox from '@/features/inventory-documents/transfer/components/TransferItemsCombobox'

import type { WarehouseItem } from '@/features/warehouse/types'

type Props = {
  documentId: number
}

const TransferItemsContainer = ({ documentId }: Props) => {
  const { data: doc } = useTransferDocument(documentId)
  const { data: productItems, isLoading } = useTransferDocumentItems(documentId)
  const { mutate, isPending } = useAddTransferDocumentItem(documentId)
  const columns = useMemo(() => TransferItemsColumnsDefs, [])

  const sourceWarehouseId = doc?.warehouseId ?? undefined

  const table = useReactTable({
    data: productItems || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const onSelectProduct = (warehouseItem: WarehouseItem) => {
    if (!warehouseItem.product) return

    mutate({
      productId: warehouseItem.product.id,
      quantity: '1',
    })
  }

  return (
    <>
      <div className='flex flex-row items-center py-5 justify-between'>
        <TransferItemsCombobox
          isPending={isPending}
          onSelectProduct={onSelectProduct}
          warehouseId={sourceWarehouseId}
        />
      </div>

      <ScrollArea
        className='h-full overflow-y-auto'
        style={{ maxHeight: 'calc(85vh - 382px - 80px)' }}
      >
        <div className='space-y-3 rounded-lg bg-background'>
          {isLoading ? (
            <LoaderSectionAnimated className='' text='Загружаем товары...' />
          ) : (
            <DataTableBasic table={table} columns={columns} />
          )}
        </div>
      </ScrollArea>
    </>
  )
}

export default TransferItemsContainer
