import React, { useState, useEffect } from 'react'

import { AsyncSelect } from '@/components/ui/async-select'
import { useActiveSuppliers } from '@/features/suppliers/api/queries'

import type { Supplier } from '@/features/suppliers/types'

interface SuppliersComboboxProps {
  onSelect: (supplier: Supplier) => void
  initialValue?: number
  isPending?: boolean
  width?: string | number
}

const SuppliersCombobox: React.FC<SuppliersComboboxProps> = ({
  onSelect,
  initialValue,
  isPending = false,
  width = '100%',
}) => {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>(
    initialValue?.toString() || ''
  )
  const { data: suppliersResponse, isLoading } = useActiveSuppliers()

  // Fetch function for suppliers
  const fetchSuppliers = async (query?: string) => {
    if (!suppliersResponse || !suppliersResponse.data) return []

    const suppliers = suppliersResponse.data

    // If initialValue is used for initial loading, return the supplier matching that ID
    if (query && query === initialValue?.toString()) {
      return suppliers.filter((s) => s.id.toString() === query)
    }

    // Filter by query if provided
    if (query) {
      return suppliers.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(query.toLowerCase()) ||
          supplier.contactPerson.toLowerCase().includes(query.toLowerCase()) ||
          (supplier.inn && supplier.inn.toLowerCase().includes(query.toLowerCase()))
      )
    }

    return suppliers
  }

  // Update selected value when initialValue changes
  useEffect(() => {
    if (initialValue) {
      setSelectedSupplierId(initialValue.toString())
    }
  }, [initialValue])

  // Handle supplier selection
  const handleSupplierChange = (value: string) => {
    setSelectedSupplierId(value)
    if (value && suppliersResponse?.data) {
      const selectedSupplier = suppliersResponse.data.find((s) => s.id.toString() === value)
      if (selectedSupplier) {
        onSelect(selectedSupplier)
      }
    } else if (!value) {
      // Handle clearing the selection
      onSelect({ id: 0 } as Supplier)
    }
  }

  return (
    <AsyncSelect<Supplier>
      fetcher={fetchSuppliers}
      preload={true}
      filterFn={(supplier, query) => {
        const nameMatch = supplier.name.toLowerCase().includes(query.toLowerCase())
        const contactMatch = supplier.contactPerson.toLowerCase().includes(query.toLowerCase())
        const innMatch = supplier.inn
          ? supplier.inn.toLowerCase().includes(query.toLowerCase())
          : false

        return nameMatch || contactMatch || innMatch
      }}
      renderOption={(supplier: Supplier) => (
        <div className='flex flex-col'>
          <div className='font-medium'>{supplier.name}</div>
          <div className='text-xs text-muted-foreground'>{supplier.contactPerson}</div>
          {supplier.inn && <div className='text-xs text-muted-foreground'>ИНН: {supplier.inn}</div>}
        </div>
      )}
      getOptionValue={(supplier: Supplier) => supplier.id.toString()}
      getDisplayValue={(supplier: Supplier) => (
        <div className='flex flex-col leading-tight text-left'>
          <div className='font-medium'>{supplier.name}</div>
          <div className='text-xxs text-muted-foreground'>{supplier.contactPerson}</div>
        </div>
      )}
      notFound={<div className='py-6 text-center text-sm'>Поставщики не найдены</div>}
      loadingSkeleton={
        <div className='py-4'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='flex items-center gap-2 p-2 animate-pulse'>
              <div className='w-full'>
                <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                <div className='h-3 bg-gray-200 rounded w-1/2'></div>
              </div>
            </div>
          ))}
        </div>
      }
      label='Поставщик'
      placeholder='Поиск поставщика...'
      value={selectedSupplierId}
      onChange={handleSupplierChange}
      width={width}
      disabled={isPending || isLoading}
      clearable={true}
    />
  )
}

export default SuppliersCombobox
