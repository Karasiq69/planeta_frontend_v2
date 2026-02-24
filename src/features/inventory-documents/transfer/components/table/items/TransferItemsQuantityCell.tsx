import * as React from 'react'

import { QuantityInput } from '@/components/ui/quantity-input'
import { useUpdateTransferDocumentItem } from '@/features/inventory-documents/transfer/api/mutations'
import { useDebounce } from '@/hooks/use-debounce'

import type { TransferDocumentItem } from '@/features/inventory-documents/transfer/types'

interface TransferItemsQuantityCellProps {
  documentId: number
  item: TransferDocumentItem
  fieldName: 'quantity'
  className?: string
  containerClassName?: string
  minValue?: number
  maxValue?: number
  step?: number
  width?: string
  disabled?: boolean
}

export const TransferItemsQuantityCell: React.FC<TransferItemsQuantityCellProps> = ({
  documentId,
  item,
  fieldName,
  className,
  containerClassName,
  minValue = 1,
  maxValue,
  step = 1,
  width,
  disabled = false,
}) => {
  const initialValue = Number(item.quantity)
  const [value, setValue] = React.useState<number | null>(null)
  const debouncedValue = useDebounce(value, 500)
  const { mutate, isPending } = useUpdateTransferDocumentItem(documentId, item.id)

  React.useEffect(() => {
    if (debouncedValue !== null) {
      mutate({ [fieldName]: String(debouncedValue) })
    }
  }, [debouncedValue, fieldName, mutate])

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
