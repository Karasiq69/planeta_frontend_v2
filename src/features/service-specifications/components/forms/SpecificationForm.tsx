'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import LoaderAnimated from '@/components/ui/LoaderAnimated'

import { SpecFormFields } from './spec-form-fields'
import { useSpecificationForm } from '../../hooks/useSpecificationForm'

import type { Specification } from '../../types'

interface Props {
  specificationData?: Specification
  onSuccess?: () => void
}

export const SpecificationForm = ({ specificationData, onSuccess }: Props) => {
  const { form, onSubmit, isPending } = useSpecificationForm({ specificationData, onSuccess })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <SpecFormFields form={form} />
        <Button disabled={isPending} variant='default' className='w-full' type='submit'>
          {specificationData ? 'Обновить' : 'Создать спецификацию'}
          {isPending && <LoaderAnimated className='text-white' />}
        </Button>
      </form>
    </Form>
  )
}
