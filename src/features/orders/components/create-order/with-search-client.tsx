'use client'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { ComboboxSearch } from '@/components/ComboboxSearch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useClientsList } from '@/features/clients/api/queries'
import { useCreateOrder } from '@/features/orders/api/mutations'
import useDebouncedSearch from '@/hooks/use-debounced-search'
import { ORDERS_URL } from '@/lib/constants'
import { formatPhone } from '@/lib/utils'

import type { IClient } from '@/features/clients/types'

type Props = {}
const WithSearchClient = (props: Props) => {
  const router = useRouter()
  // const [selectedClient, setSelectedClient] = useState("")
  const { searchTerm, searchError, debouncedHandleSearch } = useDebouncedSearch()
  const {
    data: clients,
    isLoading,
    isFetching,
  } = useClientsList({
    searchTerm: searchTerm || undefined,
  })
  const { mutate: createOrder, isPending } = useCreateOrder()

  const handleSelectClient = (client: IClient) => {
    createOrder(
      { clientId: client.id },
      {
        onSuccess: (createdOrder) => {
          router.push(`${ORDERS_URL}/${createdOrder.id}`)
        },
      }
    )
  }

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
          isLoading={isLoading || isFetching || isPending}
          onSearch={debouncedHandleSearch}
          onSelect={handleSelectClient}
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
export default WithSearchClient
