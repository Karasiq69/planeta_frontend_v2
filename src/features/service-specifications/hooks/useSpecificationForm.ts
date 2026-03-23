import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  useCreateSpecification,
  useUpdateSpecification,
} from '@/features/service-specifications/api/mutations'
import { specificationSchema } from '../components/forms/schema'

import type { SpecificationFormData } from '../components/forms/schema'
import type { Specification } from '../types'

type Props = {
  specificationData?: Specification
  onSuccess?: () => void
}

export const useSpecificationForm = ({ specificationData, onSuccess }: Props) => {
  const createMutation = useCreateSpecification()
  const updateMutation = useUpdateSpecification()

  const form = useForm<SpecificationFormData>({
    resolver: zodResolver(specificationSchema),
    defaultValues: {
      name: specificationData?.name ?? '',
      description: specificationData?.description ?? '',
      modelId: specificationData?.modelId ?? null,
      engineId: specificationData?.engineId ?? null,
      isActive: specificationData?.isActive ?? true,
    },
  })

  const isPending = createMutation.isPending || updateMutation.isPending

  const onSubmit = (data: SpecificationFormData) => {
    if (specificationData) {
      updateMutation.mutate(
        { id: specificationData.id, data },
        { onSuccess: () => onSuccess?.() }
      )
    } else {
      createMutation.mutate(data, { onSuccess: () => onSuccess?.() })
    }
  }

  return { form, onSubmit, isPending }
}
