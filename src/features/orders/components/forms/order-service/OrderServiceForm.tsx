'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import LoaderAnimated from '@/components/ui/LoaderAnimated'

import { OrderServiceFormFields } from './order-service-form-fields'
import { useOrderServiceForm } from '../../../hooks/useOrderServiceForm'

import type { OrderService } from '../../../types'

interface Props {
  orderServiceData?: OrderService
  orderId: number
  onUpdate?: (orderServiceId: number) => void
  onCreate?: (data: OrderService) => void
}

export const OrderServiceForm = ({ orderServiceData, orderId, onUpdate, onCreate }: Props) => {
  const { form, onSubmit, isLoading } = useOrderServiceForm({
    orderServiceData,
    orderId,
    onUpdate,
    onCreate,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <OrderServiceFormFields form={form} />
        <Button disabled={isLoading} variant='default' className='w-full' type='submit'>
          {orderServiceData ? 'Обновить' : 'Добавить услугу'}
          {isLoading && <LoaderAnimated className='text-white' />}
        </Button>
      </form>
    </Form>
  )
}
