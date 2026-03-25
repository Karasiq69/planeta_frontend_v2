'use client'
import * as React from 'react'

import { ComboboxSearch } from '@/components/ComboboxSearch'
import { useClientsList } from '@/features/clients/api/queries'
import useDebouncedSearch from '@/hooks/use-debounced-search'
import { formatPhone } from '@/lib/utils'

import type { IClient } from '@/features/clients/types'

const getClientName = (client: IClient) => {
  if (client.type === 'legal_entity' && client.companyName) return client.companyName
  const parts = [client.lastName, client.firstName].filter(Boolean)
  return parts.length > 0 ? parts.join(' ') : null
}

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
      getDisplayValue={(client) => getClientName(client) ?? ''}
      renderItem={(client) => {
        const name = getClientName(client)
        const phone = client.phone ? formatPhone(client.phone) : null
        return (
          <div className='flex flex-col'>
            {name && <span className='font-semibold'>{name}</span>}
            {phone && <span className='text-xs text-muted-foreground'>{phone}</span>}
          </div>
        )
      }}
      searchError={searchError}
      placeholder={placeholder}
    />
  )
}
export default ClientCombobox
