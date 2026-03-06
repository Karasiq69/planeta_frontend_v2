'use client'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import ServiceMechanicFormFields from '@/features/orders/components/forms/service-mechanic/service-mechanic-form-fields'
import { useOrderServiceMechanicForm } from '@/features/orders/hooks/useOrderServiceMechanicForm'

import type { OrderServiceEmployee } from '@/features/orders/types'

type Props = {
  orderServiceId: number
  mechanicData?: OrderServiceEmployee
  onCreate?: (data: OrderServiceEmployee) => void
  onUpdate?: (employeeId: number) => OrderServiceEmployee
}

const ServiceMechanicForm = ({ orderServiceId, mechanicData, onCreate, onUpdate }: Props) => {
  const { form, onSubmit, isLoading } = useOrderServiceMechanicForm({
    orderServiceId,
    mechanicData,
    onUpdate,
    onCreate,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <ServiceMechanicFormFields form={form} />
        <Button disabled={isLoading} variant="default" className="w-full" type='submit'>
          {mechanicData ? 'Обновить' : 'Добавить сотрудника'}
          {isLoading && <LoaderAnimated className="text-white" />}
        </Button>
      </form>
    </Form>
  )
}

export default ServiceMechanicForm
