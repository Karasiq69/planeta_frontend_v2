import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {ordersQueryKeys} from "@/features/orders/api/query-keys";
import {Order, OrderService, OrderServiceMechanic} from "@/features/orders/types";
import apiClient from "@/lib/auth/client";
import {ORDERS_URL} from "@/lib/constants";
import {
    addMechanicOrderServiceFn,
    addOrderServiceFn,
    deleteMechanicOrderServiceFn,
    deleteOrderServiceFn,
    editOrderServiceFn,
    updateMechanicOrderServiceFn
} from "@/features/orders/api/actions";

export function useEditOrder(orderId: number) {
    // const {id} = useParams();
    const queryClient = useQueryClient();

    const editOrderFn = async (updatedOrder: Partial<Order>) => {
        const response = await apiClient.patch<Order>(`${ORDERS_URL}/${orderId}/`, updatedOrder);
        return response.data;
    }

    return useMutation({
        mutationFn: editOrderFn,
        onSuccess: () => {
            toast.success('Заказ изменен')
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.detail(Number(orderId))
            });
        },
    })
}

export function useDeleteOrder(orderId: number) {
    const queryClient = useQueryClient();

    const deleteOrderFn = async () => {
        const response = await apiClient.delete<Order>(`${ORDERS_URL}/${orderId}/`);
        return response.data;
    }

    return useMutation({
        mutationFn: deleteOrderFn,
        onSuccess: () => {
            toast.success('Заказ удален')
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.all
            });
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {

        },
    })
}

export function useCreateOrder() {
    const queryClient = useQueryClient();

    const createOrderFn = async (newOrder?: Partial<Order>) => {
        const response = await apiClient.post<Order>(ORDERS_URL, newOrder);
        return response.data;
    }

    return useMutation({
        mutationFn: createOrderFn,
        onSuccess: () => {
            toast.success('Заказ создан')
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.all
            })
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {
        },
    })
}

export function useEditOrderClient(orderId: number) {
    const queryClient = useQueryClient();

    const editOrderClientFn = async (updatedOrder: Partial<Order>) => {
        const response = await apiClient.patch<Order>(`${ORDERS_URL}/${orderId}/client`, updatedOrder);
        return response.data;
    }

    return useMutation({
        mutationFn: editOrderClientFn,
        onSuccess: () => {
            toast.success('Клиент изменен')
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.detail(Number(orderId))
            });
        },
    })
}

export function useDetachOrderClient(orderId: number) {
    const queryClient = useQueryClient();

    const detachClientFn = async () => {
        const response = await apiClient.delete(`${ORDERS_URL}/${orderId}/client`)
        return response.data
    }

    return useMutation({
        mutationFn: detachClientFn,
        onSuccess: () => {
            toast.success('Клиент отвязан от заказа')
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.detail(Number(orderId))
            });
        },
    })
}

// Хук для добавления клиента к заказу
export function useAttachOrderClient(orderId: number) {
    const queryClient = useQueryClient();

    const attachClientFn = async (clientId: number) => {
        const response = await apiClient.post(`${ORDERS_URL}/${orderId}/client`, {
            clientId
        });
        return response.data;
    }

    return useMutation({
        mutationFn: attachClientFn,
        onSuccess: () => {
            toast.success('Клиент привязан к заказу');
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку');
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.detail(Number(orderId))
            });
        },
    });
}

// Хук для изменения клиента заказа
export function useChangeOrderClient(orderId: number) {
    const queryClient = useQueryClient();

    const changeClientFn = async (clientId: number) => {
        const response = await apiClient.patch(`${ORDERS_URL}/${orderId}/client`, {
            clientId
        });
        return response.data;
    }

    return useMutation({
        mutationFn: changeClientFn,
        onSuccess: () => {
            toast.success('Клиент заказа изменен');
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку');
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.detail(Number(orderId))
            });
        },
    });
}


// export function useDetach() {
//     const queryClient = useQueryClient();
//
//     const createOrderFn = async (newOrder?: Partial<Order>) => {
//         const response = await apiClient.post<Order>(ORDERS_URL, newOrder);
//         return response.data;
//     }
//
//     return useMutation({
//         mutationFn: createOrderFn,
//         onSuccess: () => {
//             toast.success('Заказ создан')
//             queryClient.invalidateQueries({
//                 queryKey: ordersQueryKeys.all
//             })
//         },
//         onError: () => {
//             toast.error('Произошла ошибка, повторите попытку')
//         },
//         onSettled: () => {
//         },
//     })
// }

// Хук для добавления автомобиля к заказу
export function useAttachOrderCar(orderId: number) {
    const queryClient = useQueryClient();

    const attachCarFn = async (carId: number) => {
        const response = await apiClient.post(`${ORDERS_URL}/${orderId}/car`, {
            carId
        });
        return response.data;
    }

    return useMutation({
        mutationFn: attachCarFn,
        onSuccess: () => {
            toast.success('Автомобиль привязан к заказу');
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку');
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.detail(Number(orderId))
            });
        },
    });
}

// Хук для редактирования автомобиля заказа
export function useEditOrderCar(orderId: number) {
    const queryClient = useQueryClient();

    const editOrderCarFn = async (updatedCar: Partial<Order>) => {
        const response = await apiClient.patch<Order>(`${ORDERS_URL}/${orderId}/car`, updatedCar);
        return response.data;
    }

    return useMutation({
        mutationFn: editOrderCarFn,
        onSuccess: () => {
            toast.success('Данные автомобиля изменены')
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.detail(Number(orderId))
            });
        },
    })
}

// Хук для отвязки автомобиля от заказа
export function useDetachOrderCar(orderId: number) {
    const queryClient = useQueryClient();

    const detachCarFn = async () => {
        const response = await apiClient.delete(`${ORDERS_URL}/${orderId}/car`)
        return response.data
    }

    return useMutation({
        mutationFn: detachCarFn,
        onSuccess: () => {
            toast.success('Автомобиль отвязан от заказа')
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.detail(Number(orderId))
            });
        },
    })
}

// Хук для замены автомобиля заказа
export function useChangeOrderCar(orderId: number) {
    const queryClient = useQueryClient();

    const changeCarFn = async (carId: number) => {
        const response = await apiClient.patch(`${ORDERS_URL}/${orderId}/car`, {
            carId
        });
        return response.data;
    }

    return useMutation({
        mutationFn: changeCarFn,
        onSuccess: () => {
            toast.success('Автомобиль заказа изменен');
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку');
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.detail(Number(orderId))
            });
        },
    });
}


export function useDeleteOrderService(orderId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteOrderServiceFn(id),
        onSuccess: () => {
            toast.success('Услуга удалена');
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку');
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.services(orderId)
            });
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.detail(orderId)
            });
        },
    });
}

export function useAddOrderServiceMechanic(orderId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({orderServiceId, mechanicId}: {
            orderServiceId: number,
            mechanicId: number
        }) => addMechanicOrderServiceFn(orderServiceId, mechanicId),
        onSuccess: () => {
            toast.success('Механик добавлен');
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку');
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.services(orderId)
            });
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.detail(orderId)
            });
        },
    });
}

export function useUpdateOrderService(orderId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({orderServiceId, data}: {
            orderServiceId: number,
            data: Partial<OrderService>,
        }) => editOrderServiceFn(orderServiceId, data),
        onSuccess: () => {
            toast.success('Услуга обновлена');
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку');
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.services(orderId)
            });
        },
    });
}

export function useUpdateMechanicOrderService(orderId?: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({orderServiceId, mechanicId, data}: {
            orderServiceId: number,
            mechanicId: number,
            data: Partial<OrderServiceMechanic>,
        }) => updateMechanicOrderServiceFn(orderServiceId, mechanicId, data),
        onSuccess: () => {
            toast.success('Механик обновлен');
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку');
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.all
            });

            // todo add orderId invalidation instead of invalidating all
            // queryClient.invalidateQueries({
            //     queryKey: ordersQueryKeys.detail(orderId)
            // });
        },
    });
}

export function useDeleteMechanicOrderService(orderId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({orderServiceId, mechanicId}: {
            orderServiceId: number,
            mechanicId: number
        }) => deleteMechanicOrderServiceFn(orderServiceId, mechanicId),
        onSuccess: () => {
            toast.success('Механик удален');
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку');
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.services(orderId)
            });
            // queryClient.invalidateQueries({
            //     queryKey: ordersQueryKeys.detail(orderId)
            // });
        },
    });
}

export function useAddOrderService(orderId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (serviceId: number) => addOrderServiceFn(orderId, serviceId),
        onSuccess: () => {
            toast.success('Услуга добавлена')
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {
            // queryClient.invalidateQueries({
            //     queryKey: ordersQueryKeys.all
            // });
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.services(Number(orderId))
            });
        },
    })
}