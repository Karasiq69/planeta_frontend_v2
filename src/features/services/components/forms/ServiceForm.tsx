'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import LoaderAnimated from '@/components/ui/LoaderAnimated'

import { ServiceFormFields } from './service-form-fields'
import { useServiceForm } from '../../hooks/useServiceForm'

import type { IService } from '../../types'

interface Props {
  serviceData?: IService
  onUpdate?: (serviceId: number) => void
  onCreate?: (data: IService) => void
}

export const ServiceForm = ({ serviceData, onUpdate, onCreate }: Props) => {
  const { form, onSubmit, isLoading, isPending } = useServiceForm({
    serviceData,
    onUpdate,
    onCreate,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <ServiceFormFields form={form} />
        <Button
          disabled={isLoading || isPending}
          variant='default'
          className='w-full'
          type='submit'
        >
          {serviceData ? 'Обновить' : 'Добавить услугу'}
          {isLoading && <LoaderAnimated className='text-white' />}
        </Button>
      </form>
    </Form>
  )
}
