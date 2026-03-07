import { Building2 } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetWarehouses } from '@/features/warehouse/api/queries'
import { warehouseTypeConfig } from '@/features/warehouse/types/config'

import type { Warehouse, WarehouseTypeEnum } from '@/features/warehouse/types'
import type { ControllerRenderProps } from 'react-hook-form'

interface FormFieldSelectWarehouseProps {
  field: ControllerRenderProps<any, any>
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
}

const FormFieldSelectWarehouse: React.FC<FormFieldSelectWarehouseProps> = ({
  field,
  placeholder = 'Выберите склад',
  disabled = false,
  className,
  id = 'warehouse-select',
}) => {
  const { data: warehouses, isLoading } = useGetWarehouses()

  return (
    <Select
      onValueChange={(value) => field.onChange(parseInt(value))}
      value={field.value?.toString()}
      disabled={disabled || isLoading}
      name={field.name}
    >
      <SelectTrigger
        id={id}
        className={`[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80 ${className || ''}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className='[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2'>
        {warehouses?.map((warehouse: Warehouse) => (
          <SelectItem key={warehouse.id} value={warehouse.id.toString()} className='flex gap-2'>
            {getWarehouseIcon(warehouse.type)}
            <span className='flex flex-col'>
              <span>{warehouse.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FormFieldSelectWarehouse

const getWarehouseIcon = (type: WarehouseTypeEnum) => {
  const Icon = warehouseTypeConfig[type]?.icon || Building2
  return <Icon size={16} aria-hidden='true' />
}
