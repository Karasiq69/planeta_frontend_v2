import { NotepadText, ShoppingCart, UserRoundCog } from 'lucide-react'
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProductsTabContent from '@/features/orders/components/order-tabs/order-products/productsTabContent'
import ServicesTabContent from '@/features/orders/components/order-tabs/order-services/servicesTabContent'
import useLocalStorage from '@/hooks/use-local-storage'

const tabsConfig = [
  {
    id: 'works',
    value: 'services',
    label: 'Работы',
    icon: NotepadText,
    children: <ServicesTabContent />,
  },
  {
    id: 'parts',
    value: 'parts',
    label: 'Товары и Запчасти',
    icon: ShoppingCart,
    children: <ProductsTabContent />,
  },
  {
    id: 'other',
    value: 'other',
    label: 'Прочее',
    icon: UserRoundCog,
    children: <> Какой-то блок </>,
  },
]

type Props = {}

const OrdersTabsWrapper = (props: Props) => {
  const [orderTab, setOrderTab] = useLocalStorage('preferred_order_tabs', tabsConfig[0].value)

  return (
    <Tabs
      value={orderTab} // Заменили defaultValue на value
      className='w-full bg-muted rounded-lg p-2 border'
      onValueChange={setOrderTab}
    >
      <TabsList className='flex items-start justify-start h-auto p-0 gap-1'>
        {tabsConfig.map((tab) => {
          const Icon = tab.icon
          return (
            <TabsTrigger
              key={tab.id}
              value={tab.value}
              className='flex gap-2 rounded-md hover:bg-background/70 items-center h-10 border border-transparent data-[state=active]:border-border'
            >
              <Icon size={16} />
              {tab.label}
            </TabsTrigger>
          )
        })}
      </TabsList>

      {tabsConfig.map((tab) => (
        <TabsContent key={tab.id} value={tab.value}>
          {tab.children}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default OrdersTabsWrapper
