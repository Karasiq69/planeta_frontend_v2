import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { useCreateClient, useEditClient } from '@/features/clients/api/mutations'
import { clientSchema } from '@/features/clients/components/forms/schema'

import type { ClientFormData } from '@/features/clients/components/forms/schema'
import type { IClient } from '@/features/clients/types'

export type ClientFormProps = {
  clientData?: IClient
  onCreate?: (data: IClient) => void
  onUpdate?: (clientId: number) => void
}

export const useClientForm = ({ clientData, onCreate, onUpdate }: ClientFormProps) => {
  const { mutate: createClient, isPending: isCreating } = useCreateClient()
  const { mutate: updateClient, isPending: isUpdating } = useEditClient(clientData?.id as number)

  const defaultValues = useMemo(() => {
    return {
      type: clientData?.type ?? ('individual' as const),
      firstName: clientData?.firstName ?? '',
      lastName: clientData?.lastName ?? '',
      middleName: clientData?.middleName ?? '',
      email: clientData?.email ?? '',
      phone: clientData?.phone ?? '',
      companyName: clientData?.companyName ?? '',
      inn: clientData?.inn ?? '',
      kpp: clientData?.kpp ?? '',
      address: clientData?.address ?? '',
    }
  }, [clientData])

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    mode: 'onSubmit',
    defaultValues,
  })

  const onSubmit = (data: ClientFormData) => {
    const isOrg =
      data.type === 'legal_entity' ||
      data.type === 'individual_entrepreneur' ||
      data.type === 'government'

    const payload = {
      type: data.type,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName || undefined,
      email: data.email || undefined,
      phone: data.phone,
      ...(isOrg
        ? {
            companyName: data.companyName || undefined,
            inn: data.inn || undefined,
            kpp: data.kpp || undefined,
            address: data.address || undefined,
          }
        : {}),
    }

    if (clientData) {
      updateClient(payload, {
        onSuccess: (data) => onUpdate?.(data.id),
      })
    } else {
      createClient(payload, {
        onSuccess: (data) => onCreate?.(data),
      })
    }
  }

  const isLoading = isCreating || isUpdating

  return { form, onSubmit, isLoading, isUpdating, isCreating }
}
