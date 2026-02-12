'use client'
import { Search } from 'lucide-react'
import * as React from 'react'

import { ComboboxSearch } from '@/components/ComboboxSearch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useClientsList } from '@/features/clients/api/queries'
import useDebouncedSearch from '@/hooks/use-debounced-search'
import { formatPhone } from '@/lib/utils'

import type { IClient } from '@/features/clients/types'

type Props = {
  handleSelect: (client: IClient) => void
}
const ClientCombobox = ({ handleSelect }: Props) => {
  const { searchTerm, searchError, debouncedHandleSearch } = useDebouncedSearch()
  const {
    data: clients,
    isLoading,
    isFetching,
  } = useClientsList({
    searchTerm: searchTerm || undefined,
  })

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='text-lg flex gap-2 items-center'>
          <Search size={17} />
          Поиск клиента
        </CardTitle>{' '}
        <CardDescription>
          Найти существующего клиента и сразу добавить его автомобиль
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ComboboxSearch<IClient>
          data={clients}
          isLoading={isLoading || isFetching}
          onSearch={debouncedHandleSearch}
          onSelect={handleSelect}
          getDisplayValue={(client) => client.firstName}
          renderItem={(client) => (
            <div className='flex flex-col'>
              <span className='font-semibold'>{formatPhone(client.phone)}</span>
              {client.firstName && (
                <span className='text-xs text-muted-foreground'>{client.firstName}</span>
              )}
            </div>
          )}
          searchError={searchError}
          placeholder='Выберите клиента...'
        />
      </CardContent>
    </Card>
  )
}
export default ClientCombobox
