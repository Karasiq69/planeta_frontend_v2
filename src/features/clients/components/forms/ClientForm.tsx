'use client'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import ClientFormFields from '@/features/clients/components/forms/client-form-fields'
import { useClientForm } from '@/features/clients/hooks/useClientForm'

import type { IClient } from '@/features/clients/types'

type Props = {
  clientId?: number
  clientData?: IClient | undefined
  onCreate?: (data: IClient) => void // дополнительная функция при создании клиента
  onUpdate?: (cliendId: number) => IClient // доп функция при обновлении
}
const ClientForm = ({ clientId, clientData, onCreate, onUpdate }: Props) => {
  const { form, onSubmit, isLoading } = useClientForm({ clientData, onUpdate, onCreate })

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <ClientFormFields form={form} />
          <Button disabled={isLoading} variant="default" className="w-full" type='submit'>
            {clientId ? 'Обновить' : 'Создать'}{' '}
            {isLoading && <LoaderAnimated className="text-white" />}
          </Button>
        </form>
      </Form>
    </div>
  )
}
export default ClientForm
