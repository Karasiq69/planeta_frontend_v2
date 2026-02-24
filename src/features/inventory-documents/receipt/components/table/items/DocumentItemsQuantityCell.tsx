import * as React from 'react'

import { QuantityInput } from '@/components/ui/quantity-input'
import { useUpdateReceiptDocumentItem } from '@/features/inventory-documents/receipt/api/mutations'
import { useDebounce } from '@/hooks/use-debounce'

import type { ReceiptDocumentItem } from '@/features/inventory-documents/types'

interface DocumentItemsQuantityCellProps {
  documentId: number
  item: ReceiptDocumentItem
  fieldName: 'quantity'
  className?: string
  containerClassName?: string
  minValue?: number
  maxValue?: number
  step?: number
  width?: string
  disabled?: boolean
}

export const DocumentItemsQuantityCell: React.FC<DocumentItemsQuantityCellProps> = ({
  documentId,
  item,
  fieldName,
  className,
  containerClassName,
  minValue = 0.001,
  maxValue,
  step = 0.001,
  width,
  disabled = false,
}) => {
  // Use the actual item quantity from props
  const initialValue = Number(item.quantity)
  const [value, setValue] = React.useState<number | null>(null)
  const debouncedValue = useDebounce(value, 500)
  // todo fix dis
  const { mutate, isPending } = useUpdateReceiptDocumentItem(documentId, item.id)
  // Only respond to debounced value changes when there's actually a value to update
  React.useEffect(() => {
    if (debouncedValue !== null) {
      mutate({ [fieldName]: debouncedValue })
    }
  }, [debouncedValue, fieldName, mutate])

  // Handle change from QuantityInput
  const handleChange = (newValue: number) => {
    setValue(newValue)
  }

  return (
    <QuantityInput
      defaultValue={initialValue}
      onChange={handleChange}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      width={width}
      className={className}
      containerClassName={containerClassName}
      disabled={disabled || isPending}
    />
  )
}
