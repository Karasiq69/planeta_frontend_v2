'use client'

import { toast } from 'sonner'

import { useAddDocumentItem } from '@/features/documents/api/mutations'
import { transferItemColumns } from '@/features/documents/components/columns/transfer-item-columns'
import BaseItemsSection from '@/features/documents/components/items-sections/BaseItemsSection'
import WarehouseItemsCombobox from '@/features/documents/components/WarehouseItemsCombobox'

import type { Document } from '@/features/documents/types'
import type { WarehouseItem } from '@/features/warehouse/types'

interface Props {
  document: Document
}

const WriteOffItemsSection = ({ document }: Props) => {
  const { mutate: addItem, isPending: isAdding } = useAddDocumentItem(document.id)

  const handleSelectWarehouseItem = (warehouseItem: WarehouseItem) => {
    if (!warehouseItem.product) return

    addItem(
      { productId: warehouseItem.product.id, quantity: 1 },
      { onSuccess: () => toast.success(`Товар добавлен: ${warehouseItem.product!.name}`) }
    )
  }

  return (
    <BaseItemsSection
      documentId={document.id}
      status={document.status}
      columns={transferItemColumns}
      combobox={
        <WarehouseItemsCombobox
          warehouseId={document.warehouseId}
          onSelect={handleSelectWarehouseItem}
          isPending={isAdding}
        />
      }
    />
  )
}

export default WriteOffItemsSection
