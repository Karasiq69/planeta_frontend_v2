'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateService, useUpdateService } from '@/features/services/api/mutations'
import { serviceSchema } from '../components/forms/schema'

import type { ServiceFormData } from '../components/forms/schema'
import type { IService } from '../types'

type Props = {
  serviceData?: IService
  onSuccess?: () => void
  onCreate?: (data: IService) => void
}

export const useServiceForm = ({ serviceData, onSuccess, onCreate }: Props) => {
  const createMutation = useCreateService()
  const updateMutation = useUpdateService()

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: serviceData?.name ?? '',
      description: serviceData?.description ?? '',
      defaultDuration: serviceData?.defaultDuration ?? 60,
    },
  })

  const isPending = createMutation.isPending || updateMutation.isPending

  const onSubmit = (data: ServiceFormData) => {
    if (serviceData) {
      updateMutation.mutate(
        { id: serviceData.id, data },
        { onSuccess: () => onSuccess?.() },
      )
    } else {
      createMutation.mutate(data, {
        onSuccess: (created) => {
          onCreate?.(created)
          onSuccess?.()
        },
      })
    }
  }

  return { form, onSubmit, isPending }
}
