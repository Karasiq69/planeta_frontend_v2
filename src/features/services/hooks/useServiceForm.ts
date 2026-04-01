'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateService, useUpdateService } from '@/features/services/api/mutations'
import { minutesToHours, hoursToMinutes } from '@/shared/lib/duration'
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
      defaultDuration: serviceData ? minutesToHours(serviceData.defaultDuration) : 1,
    },
  })

  const isPending = createMutation.isPending || updateMutation.isPending

  const onSubmit = (data: ServiceFormData) => {
    const payload = { ...data, defaultDuration: hoursToMinutes(data.defaultDuration) }
    if (serviceData) {
      updateMutation.mutate(
        { id: serviceData.id, data: payload },
        { onSuccess: () => onSuccess?.() },
      )
    } else {
      createMutation.mutate(payload, {
        onSuccess: (created) => {
          onCreate?.(created)
          onSuccess?.()
        },
      })
    }
  }

  return { form, onSubmit, isPending }
}
