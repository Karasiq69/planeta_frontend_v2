import OrderPageWrapper from '@/features/orders/components/OrderPageWrapper'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Заказ' }

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  return <OrderPageWrapper orderId={Number(id)} />
}
