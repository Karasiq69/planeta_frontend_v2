import { ArrowLeft, ArrowLeftRight, ArrowRightLeft, RotateCcw, Trash2, Wrench } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { OperationType, operationLabels } from '@/features/documents/lib/constants'

import type { ControllerRenderProps } from 'react-hook-form'

export const getOperationLabel = (type: string | null | undefined) =>
  (type && operationLabels[type]) || null

const operationIcons: Record<string, typeof ArrowRightLeft> = {
  [OperationType.TRANSFER]: ArrowRightLeft,
  [OperationType.WRITE_OFF]: Trash2,
  [OperationType.SEND_TO_REPAIR]: Wrench,
  [OperationType.TRANSFER_IN_REPAIR]: ArrowLeftRight,
  [OperationType.RETURN_FROM_REPAIR]: RotateCcw,
  [OperationType.RETURN_FROM_OPERATION]: ArrowLeft,
}

export const getOperationIcon = (type: string, size = 16) => {
  const Icon = operationIcons[type] || ArrowRightLeft
  return <Icon size={size} aria-hidden='true' />
}

interface Props {
  field: ControllerRenderProps<any, any>
  placeholder?: string
  disabled?: boolean
}

const FormFieldSelectOperation = ({
  field,
  placeholder = 'Выберите тип операции',
  disabled = false,
}: Props) => {
  return (
    <Select
      onValueChange={(value) => field.onChange(value)}
      value={field.value}
      disabled={disabled}
      name={field.name}
    >
      <SelectTrigger
        className='[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80'
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className='[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2'>
        {Object.entries(operationLabels).map(([value, label]) => (
          <SelectItem key={value} value={value} className='flex gap-2'>
            {getOperationIcon(value)}
            <span>{label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FormFieldSelectOperation
