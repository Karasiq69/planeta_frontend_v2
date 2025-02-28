"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {Calendar, Car, Cog, LayoutDashboard, Package, ShoppingCart, Users, Wallet} from "lucide-react"
import {cn} from "@/lib/utils"
import {useCallback} from "react"
import {MenuItem} from "@/components/common/sidebar/MenuItem"

interface NavMainProps {
    isOpen?: boolean;
}

export const mainMenuItems = [
    {
        title: "Дашборд",
        url: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Заказы",
        url: "/orders",
        icon: ShoppingCart
    },
    {
        title: "Автомобили",
        url: "/cars",
        icon: Car
    },
    {
        title: "Клиенты",
        url: "/clients",
        icon: Users
    },
    {
        title: "Склад",
        url: "/warehouse",
        icon: Package
    },
    {
        title: "-- Движения товаров (transaction)?",
        url: "/warehouse/transactions",
        icon: Package
    },
    {
        title: "-- Накладные new",
        url: "/inventory-documents",
        icon: Package
    },
    {
        title: "-- Inventory docs old",
        url: "/warehouse/inventory-documents",
        icon: Package
    },
    {
        title: "Платежи",
        url: "/payments",
        icon: Wallet
    },
    {
        title: "Товары",
        url: "/products",
        icon: ShoppingCart
    },
]

export function NavMain({isOpen}: NavMainProps) {
    const pathname = usePathname()

    const getIsActive = useCallback((urlOrItem: string | { url: string }) => {
        const url = typeof urlOrItem === 'string' ? urlOrItem : urlOrItem.url
        return pathname.startsWith(url)
    }, [pathname]) // добавили pathname в зависимости

    return (
        <nav className="mt-8 w-full">
            <div className="mt-6 mb-2">
                <MenuItem
                    title="Календарь"
                    url="/calendar"
                    icon={Calendar}
                    isActive={getIsActive('/calendar')}
                    isOpen={isOpen}
                />
            </div>

            <ul className="flex flex-col items-start space-y-1">
                <li className="w-full pt-5">
                    {isOpen || isOpen === undefined ? (
                        <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                            Меню
                        </p>
                    ) : null}

                    {mainMenuItems.map((item) => (
                        <MenuItem
                            key={item.title}
                            title={item.title}
                            url={item.url}
                            icon={item.icon}
                            isActive={getIsActive(item)}
                            isOpen={isOpen}
                        />
                    ))}
                </li>
            </ul>
        </nav>
    )
}