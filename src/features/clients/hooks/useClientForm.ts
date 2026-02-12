import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateClient, useEditClient } from '@/features/clients/api/mutations'
import { clientSchema } from '@/features/clients/components/forms/schema'

import type { ClientFormData} from '@/features/clients/components/forms/schema';
import type { IClient } from '@/features/clients/types'

export type ClientFormProps = {
  clientData?: IClient
  onCreate?: (data: IClient) => void // дополнительная функция при создании клиента
  onUpdate?: (cliendId: number) => IClient // доп функция при обновлении
}

export const useClientForm = ({ clientData, onCreate, onUpdate }: ClientFormProps) => {
  const { mutate: createClient, isPending: isCreating } = useCreateClient()
  const { mutate: updateClient, isPending: isUpdating } = useEditClient(clientData?.id as number)

  const defaultValues = useMemo(() => {
    return {
      firstName: clientData?.firstName ?? '',
      lastName: clientData?.lastName ?? '',
      email: clientData?.email ?? '',
      phone: clientData?.phone ?? '',
    }
  }, [clientData])

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    mode: 'onSubmit',
    defaultValues: defaultValues,
  })

  const onSubmit = (data: ClientFormData) => {
    if (clientData) {
      updateClient(
        {
          firstName: data.firstName,
          lastName: data?.lastName,
          email: data?.email,
          phone: data?.phone,
        },
        {
          onSuccess: (data) => onUpdate && onUpdate(data.id),
        }
      )
    } else {
      createClient(
        {
          firstName: data?.firstName,
          lastName: data?.lastName,
          email: data?.email,
          phone: data?.phone,
        },
        {
          onSuccess: (data) => onCreate && onCreate(data),
        }
      )
    }
  }

  const isLoading = isCreating || isUpdating

  return { form, onSubmit, isLoading, isUpdating, isCreating }
}
