'use client'

import { toast } from 'sonner'

import { useAddDocumentItem } from '@/features/documents/api/mutations'
import { documentItemColumns } from '@/features/documents/components/columns/document-item-columns'
import BaseItemsSection from '@/features/documents/components/items-sections/BaseItemsSection'
import ProductsCombobox from '@/features/products/components/ProductsCombobox'

import type { Document } from '@/features/documents/types'
import type { Product } from '@/features/products/types'

interface Props {
  document: Document
}

const ReceiptItemsSection = ({ document }: Props) => {
  const { mutate: addItem, isPending: isAdding } = useAddDocumentItem(document.id)

  const handleSelectProduct = (product: Product) => {
    addItem(
      { productId: product.id, quantity: 1 },
      { onSuccess: () => toast.success(`Товар добавлен: ${product.name}`) }
    )
  }

  return (
    <BaseItemsSection
      documentId={document.id}
      status={document.status}
      columns={documentItemColumns}
      combobox={<ProductsCombobox onSelect={handleSelectProduct} isPending={isAdding} />}
    />
  )
}

export default ReceiptItemsSection
