'use client'
import * as React from 'react'

import { ComboboxSearch } from '@/components/ComboboxSearch'
import { useClientsList } from '@/features/clients/api/queries'
import useDebouncedSearch from '@/hooks/use-debounced-search'
import { formatPhone } from '@/lib/utils'

import type { IClient } from '@/features/clients/types'

type Props = {
  handleSelect: (client: IClient) => void
  isPending?: boolean
  placeholder?: string
}
const ClientCombobox = ({ handleSelect, isPending, placeholder = 'Выберите клиента...' }: Props) => {
  const { searchTerm, searchError, debouncedHandleSearch } = useDebouncedSearch()
  const {
    data: clients,
    isLoading,
    isFetching,
  } = useClientsList({
    searchTerm: searchTerm || undefined,
  })

  return (
    <ComboboxSearch<IClient>
      data={clients}
      isLoading={isLoading || isFetching}
      isPending={isPending}
      onSearch={debouncedHandleSearch}
      onSelect={handleSelect}
      getDisplayValue={(client) =>
        client.type === 'legal_entity' && client.companyName
          ? client.companyName
          : `${client.lastName} ${client.firstName}`
      }
      renderItem={(client) => (
        <div className='flex flex-col'>
          <span className='font-semibold'>
            {client.type === 'legal_entity' && client.companyName
              ? client.companyName
              : `${client.lastName} ${client.firstName}`}
          </span>
          <span className='text-xs text-muted-foreground'>{formatPhone(client.phone)}</span>
        </div>
      )}
      searchError={searchError}
      placeholder={placeholder}
    />
  )
}
export default ClientCombobox
