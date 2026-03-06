'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import LoaderAnimated from '@/components/ui/LoaderAnimated'

import { ServiceFormFields } from './service-form-fields'
import { useServiceForm } from '../../hooks/useServiceForm'

import type { IService } from '../../types'

interface Props {
  serviceData?: IService
  onSuccess?: () => void
  onCreate?: (data: IService) => void
}

export const ServiceForm = ({ serviceData, onSuccess, onCreate }: Props) => {
  const { form, onSubmit, isPending } = useServiceForm({ serviceData, onSuccess, onCreate })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <ServiceFormFields form={form} />
        <Button disabled={isPending} variant='default' className='w-full' type='submit'>
          {serviceData ? 'Обновить' : 'Добавить услугу'}
          {isPending && <LoaderAnimated className='text-white' />}
        </Button>
      </form>
    </Form>
  )
}
