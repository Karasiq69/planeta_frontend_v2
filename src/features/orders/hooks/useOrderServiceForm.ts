import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { OrderService } from "../types";
import { orderServiceSchema, OrderServiceFormData } from "../components/forms/order-service/schema";

type Props = {
  orderServiceData?: OrderService;
  orderId: number;
  onUpdate?: (orderServiceId: number) => void;
  onCreate?: (data: OrderService) => void;
};

export const useOrderServiceForm = ({ orderServiceData, orderId, onUpdate, onCreate }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<OrderServiceFormData>({
    resolver: zodResolver(orderServiceSchema),
    defaultValues: {
      serviceId: orderServiceData?.serviceId || 0,
      defaultDuration: orderServiceData?.defaultDuration || 60,
      appliedRate: orderServiceData?.appliedRate || 0,
      appliedPrice: orderServiceData?.appliedPrice || 0,
      discountPercent: orderServiceData?.discountPercent || 0,
      startTime: orderServiceData?.startTime || null,
      endTime: orderServiceData?.endTime || null,
    },
  });

  const onSubmit = async (data: OrderServiceFormData) => {
    setIsLoading(true);
    try {
      const serviceData = {
        ...data,
        orderId,
      };

      if (orderServiceData?.id) {
        // await updateOrderService.mutateAsync({ id: orderServiceData.id, ...serviceData });
        onUpdate?.(orderServiceData.id);
      } else {
        // const newOrderService = await createOrderService.mutateAsync(serviceData);
        // onCreate?.(newOrderService);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading };
}; 