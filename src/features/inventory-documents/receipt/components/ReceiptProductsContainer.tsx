'use client'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

import DataTableBasic from '@/components/common/table/data-table-basic'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { ScrollArea } from '@/components/ui/scroll-area'
import ProductsCombobox from '@/features/products/components/ProductsCombobox'
import { useAddReceiptDocumentItem } from '@/features/inventory-documents/receipt/api/mutations'
import { useReceiptDocumentItems } from '@/features/inventory-documents/receipt/api/queries'
import { ReceiptItemsColumnsDefs } from '@/features/inventory-documents/receipt/components/table/items/columns-items'

import type { Product } from '@/features/products/types'

type Props = {
  onAddItem?: () => void
}

const ReceiptProductContainer = ({ onAddItem }: Props) => {
  const { id } = useParams()
  const docId = Number(id)
  const { data: productItems, isLoading } = useReceiptDocumentItems(docId)
  const { mutate, isPending } = useAddReceiptDocumentItem(docId)
  const columns = useMemo(() => ReceiptItemsColumnsDefs, [])

  const table = useReactTable({
    data: productItems || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const onSelectProduct = (product: Product) => {
    mutate({
      productId: product.id,
      quantity: 1,
    })
  }

  return (
    <div className="">
      <div className='flex flex-row items-center py-5 justify-between'>
        <ProductsCombobox
          isPending={isPending}
          onSelect={onSelectProduct}
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
    </div>
  )
}

export default ReceiptProductContainer
