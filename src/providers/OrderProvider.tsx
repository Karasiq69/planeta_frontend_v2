'use client'
import React, {createContext, useContext} from 'react'
import {useParams} from "next/navigation";

interface OrderContextType {
    // order: ReturnType<typeof useOrder>;
    // car: ReturnType<typeof useCar>;
    // // client: ReturnType<typeof useClient>;
    // orderServices: ReturnType<typeof useOrderServices>;
    // orderProducts: ReturnType<typeof useOrderProducts>;
    // orderComments: ReturnType<typeof useOrderComments>;

}

const OrderContext = createContext<OrderContextType | null>(null)

export function OrderProvider({children}: { children: React.ReactNode }) {
    // const order = useOrder()
    const {id: orderId} = useParams()
    // const orderId = Number(order?.data?.id)
    //
    // const car = useCar(order.data?.car?.id ?? '')
    // const client = useClient(order.data?.client?.id ?? '')
    // const orderServices = useOrderServices(+orderId)
    // const orderProducts = useOrderProducts(+orderId)
    // const orderComments = useOrderComments(orderId)
    const bob = 'sad'
    return (
        <OrderContext.Provider value={{
            bob
            // order,
            // car,
            // client,
            // orderServices,
            // orderProducts,
            // orderComments,
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export function useOrderContext() {
    const context = useContext(OrderContext)
    if (!context) {
        throw new Error('useOrderContext must be used within an OrderProvider')
    }
    return context
}