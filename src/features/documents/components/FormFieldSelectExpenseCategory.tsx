import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { expenseCategoryConfig } from '@/features/documents/lib/constants'

import type { ControllerRenderProps } from 'react-hook-form'

interface Props {
  field: ControllerRenderProps<any, any>
  placeholder?: string
  disabled?: boolean
}

const FormFieldSelectExpenseCategory = ({
  field,
  placeholder = 'Выберите категорию расхода',
  disabled = false,
}: Props) => {
  return (
    <Select
      onValueChange={(value) => field.onChange(value)}
      value={field.value}
      disabled={disabled}
      name={field.name}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(expenseCategoryConfig).map(([value, config]) => (
          <SelectItem key={value} value={value}>
            {config.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FormFieldSelectExpenseCategory
