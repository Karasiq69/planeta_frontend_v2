import {OrderService} from "@/features/orders/types";
import {OrderProduct} from "@/features/order-products/types";
import {formatPrice} from "@/lib/utils";
import {useOrderServicesById} from "@/features/orders/api/queries";
import {useOrderProductsByOrderId} from "@/features/order-products/api/queries";

/**
 * Вычисляет общую длительность всех сервисов в минутах
 */
export const calculateTotalDuration = (services: OrderService[]): number => {
    return services.reduce((total, service) => total + (service.defaultDuration || 0), 0);
};

/**
 * Форматирует длительность из минут в часы и минуты
 */
export const formatDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} мин`;
    if (minutes === 0) return `${hours} ч`;
    return `${hours} ч ${minutes} мин`;
};

/**
 * Вычисляет общую стоимость услуг
 */
export const calculateServicesTotal = (services: OrderService[]): number => {
    return services.reduce((total, service) => {
        const price = service.appliedPrice || 0;
        const discount = service.discountPercent || 0;
        return total + (price * (1 - discount / 100));
    }, 0);
};

/**
 * Вычисляет общую стоимость товаров
 */
export const calculateProductsTotal = (products: OrderProduct[]): number => {
    return products.reduce((total, product) => {
        // Используем actualPrice если есть, иначе estimatedPrice
        const price = product.actualPrice ?? product.estimatedPrice;
        return total + (parseFloat(price) * parseInt(product.quantity));
    }, 0);
};

/**
 * Подсчитывает количество активных товаров (не отмененных)
 */
export const countActiveProducts = (products: OrderProduct[]): number => {
    return products.filter(product => product.status !== 'CANCELLED').length;
};

/**
 * Подсчитывает количество активных услуг
 */
export const countActiveServices = (services: OrderService[]): number => {
    return services.filter(service => service.appliedPrice > 0).length;
};

/**
 * Вычисляет налог (НДС 18%)
 */
export const calculateTax = (amount: number): number => {
    return amount * 0.18;
};

/**
 * Вычисляет итоговую сумму с налогом
 */
export const calculateTotal = (services: OrderService[], products: OrderProduct[]): number => {
    const servicesTotal = calculateServicesTotal(services);
    const productsTotal = calculateProductsTotal(products);
    const subtotal = servicesTotal + productsTotal;
    const tax = calculateTax(subtotal);

    return subtotal + tax;
};


/**
 * Получает полную сводку по заказу
 */
export const getOrderSummary = (services: OrderService[], products: OrderProduct[]) => {
    const servicesTotal = calculateServicesTotal(services);
    const productsTotal = calculateProductsTotal(products);
    const subtotal = servicesTotal + productsTotal;
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;

    return {
        services: {
            count: countActiveServices(services),
            duration: calculateTotalDuration(services),
            formattedDuration: formatDuration(calculateTotalDuration(services)),
            total: servicesTotal,
            formattedTotal: formatPrice(servicesTotal)
        },
        products: {
            count: countActiveProducts(products),
            total: productsTotal,
            formattedTotal: formatPrice(productsTotal)
        },
        summary: {
            subtotal,
            formattedSubtotal: formatPrice(subtotal),
            tax,
            formattedTax: formatPrice(tax),
            total,
            formattedTotal: formatPrice(total)
        }
    };
};