import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUpdateEmployeeOrderService } from '@/features/orders/api/mutations'

import {
  orderServiceMechanicSchema,
} from '../components/forms/service-mechanic/schema'

import type {
  OrderServiceMechanicFormData} from '../components/forms/service-mechanic/schema';
import type { OrderServiceEmployee } from '../types'

// import { useCreateOrderServiceMechanic, useUpdateOrderServiceMechanic } from "../api/mutations";

type Props = {
  orderServiceId: number
  mechanicData?: OrderServiceEmployee
  onUpdate?: (employeeId: number) => OrderServiceEmployee
  onCreate?: (data: OrderServiceEmployee) => void
}

export const useOrderServiceMechanicForm = ({
  orderServiceId,
  mechanicData,
  onUpdate,
  onCreate,
}: Props) => {
  // const createServiceMechanic = useCreateOrderServiceMechanic();
  const updateServiceMechanic = useUpdateEmployeeOrderService()

  const form = useForm<OrderServiceMechanicFormData>({
    resolver: zodResolver(orderServiceMechanicSchema),
    defaultValues: {
      employeeId: mechanicData?.employeeId || 0,
      participationPercentage: mechanicData?.participationPercentage || 100,
      paymentType: mechanicData?.paymentType || 'percent',
      paymentRate: mechanicData?.paymentRate || 0,
    },
  })

  const onSubmit = async (data: OrderServiceMechanicFormData) => {
    if (!mechanicData?.id) return
    const { employeeId, ...restData } = data

    updateServiceMechanic.mutateAsync({
      employeeId: mechanicData.id,
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
