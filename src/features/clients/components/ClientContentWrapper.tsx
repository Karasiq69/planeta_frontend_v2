'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useClientById, useClientSummary } from '@/features/clients/api/queries'
import ClientInfoCard from '@/features/clients/components/ClientInfoCard'
import ClientSummaryCards from '@/features/clients/components/ClientSummaryCards'
import ClientCarsGrid from '@/features/clients/components/cars/ClientCarsGrid'
import ClientOrdersTab from '@/features/clients/components/orders/ClientOrdersTab'
import ClientPaymentsTab from '@/features/clients/components/payments/ClientPaymentsTab'

interface ClientContentWrapperProps {
  clientId: string
}

const ClientContentWrapper = ({ clientId }: ClientContentWrapperProps) => {
  const id = +clientId
  const { data: client, isLoading } = useClientById(id)
  const { data: summary, isLoading: summaryLoading } = useClientSummary(id)

  if (isLoading) {
    return (
      <section className="space-y-5">
        <Skeleton className="h-[140px]" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </section>
    )
  }

  if (!client) return null

  return (
    <section className="space-y-5">
      <ClientInfoCard client={client} />

      <ClientSummaryCards summary={summary} isLoading={summaryLoading} />

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="cars">Автомобили</TabsTrigger>
          <TabsTrigger value="payments">Оплаты</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="mt-4">
          <ClientOrdersTab clientId={id} />
        </TabsContent>
        <TabsContent value="cars" className="mt-4">
          <ClientCarsGrid clientId={id} />
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
          <ClientPaymentsTab clientId={id} />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default ClientContentWrapper
