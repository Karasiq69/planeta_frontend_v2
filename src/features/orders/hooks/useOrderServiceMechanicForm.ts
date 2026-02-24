import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUpdateMechanicOrderService } from '@/features/orders/api/mutations'

import {
  orderServiceMechanicSchema,
} from '../components/forms/service-mechanic/schema'

import type {
  OrderServiceMechanicFormData} from '../components/forms/service-mechanic/schema';
import type { OrderServiceMechanic } from '../types'

// import { useCreateOrderServiceMechanic, useUpdateOrderServiceMechanic } from "../api/mutations";

type Props = {
  orderServiceId: number
  mechanicData?: OrderServiceMechanic
  onUpdate?: (mechanicId: number) => OrderServiceMechanic
  onCreate?: (data: OrderServiceMechanic) => void
}

export const useOrderServiceMechanicForm = ({
  orderServiceId,
  mechanicData,
  onUpdate,
  onCreate,
}: Props) => {
  // const createServiceMechanic = useCreateOrderServiceMechanic();
  const updateServiceMechanic = useUpdateMechanicOrderService()

  const form = useForm<OrderServiceMechanicFormData>({
    resolver: zodResolver(orderServiceMechanicSchema),
    defaultValues: {
      mechanicId: mechanicData?.mechanicId || 0,
      participationPercentage: mechanicData?.participationPercentage || 100,
      paymentType: mechanicData?.paymentType || 'percent',
      paymentRate: mechanicData?.paymentRate || 0,
    },
  })

  const onSubmit = async (data: OrderServiceMechanicFormData) => {
    if (!mechanicData?.id) return
    const { mechanicId, ...restData } = data

    updateServiceMechanic.mutateAsync({
      mechanicId: mechanicData.id,
      orderServiceId: orderServiceId,
      data: {
        ...restData,
      },
    })
    onUpdate?.(mechanicData.id)
  }
  const isLoading = updateServiceMechanic.isPending

  return { form, onSubmit, isLoading }
}
