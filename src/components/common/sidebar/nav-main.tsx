// "use client"
//
// import Link from "next/link"
// import {usePathname} from "next/navigation"
// import {
//     BriefcaseBusiness,
//     Calendar,
//     Car,
//     Cog,
//     LayoutDashboard,
//     Package,
//     ShoppingCart,
//     Users,
//     Wallet
// } from "lucide-react"
// import {cn} from "@/lib/utils"
// import {useCallback} from "react"
// import {MenuItem} from "@/components/common/sidebar/MenuItem"
//
// interface NavMainProps {
//     isOpen?: boolean;
// }
//
// export const mainMenuItems = [
//     {
//         title: "Дашборд",
//         url: "/dashboard",
//         icon: LayoutDashboard
//     },
//     {
//         title: "Заказы",
//         url: "/orders",
//         icon: ShoppingCart
//     },
//     {
//         title: "Автомобили",
//         url: "/cars",
//         icon: Car
//     },
//     {
//         title: "Клиенты",
//         url: "/clients",
//         icon: Users
//     },
//     {
//         title: "Склад",
//         url: "/warehouse",
//         icon: Package
//     },
//     {
//         title: "-- Движения товаров",
//         url: "/warehouse/transactions",
//         icon: Package
//     },
//     {
//         title: "-- Накладные",
//         url: "/inventory-documents",
//         icon: Package
//     },
//     {
//         title: "Платежи",
//         url: "/payments",
//         icon: Wallet
//     },
//     {
//         title: "Организации",
//         url: "/organizations",
//         icon: BriefcaseBusiness
//     },
//     {
//         title: "Товары",
//         url: "/products",
//         icon: ShoppingCart
//     },
// ]
//
// export function NavMain({isOpen}: NavMainProps) {
//     const pathname = usePathname()
//
//     const getIsActive = useCallback((urlOrItem: string | { url: string }) => {
//         const url = typeof urlOrItem === 'string' ? urlOrItem : urlOrItem.url
//         return pathname.startsWith(url)
//     }, [pathname]) // добавили pathname в зависимости
//
//     return (
//         <nav className="mt-8 w-full">
//             <div className="mt-6 mb-2">
//                 <MenuItem
//                     title="Календарь"
//                     url="/calendar"
//                     icon={Calendar}
//                     isActive={getIsActive('/calendar')}
//                     isOpen={isOpen}
//                 />
//             </div>
//
//             <ul className="flex flex-col items-start space-y-1">
//                 <li className="w-full pt-5">
//                     {isOpen || isOpen === undefined ? (
//                         <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
//                             Меню
//                         </p>
//                     ) : null}
//
//                     {mainMenuItems.map((item) => (
//                         <MenuItem
//                             key={item.title}
//                             title={item.title}
//                             url={item.url}
//                             icon={item.icon}
//                             isActive={getIsActive(item)}
//                             isOpen={isOpen}
//                         />
//                     ))}
//                 </li>
//             </ul>
//         </nav>
//     )
// }

"use client"

import {type LucideIcon} from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {useCallback} from "react";
import {usePathname} from "next/navigation";

export function NavMain({
                            items,
                        }: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
    }[]
}) {
    const pathname = usePathname()

    const getIsActive = useCallback((urlOrItem: string | { url: string }) => {
        const url = typeof urlOrItem === 'string' ? urlOrItem : urlOrItem.url
        return pathname.startsWith(url)
    }, [pathname])

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Меню</SidebarGroupLabel>

            <SidebarGroupContent className="flex flex-col gap-2">
                {/*<SidebarMenu>*/}
                {/*    <SidebarMenuItem className="flex items-center gap-2">*/}
                {/*        <SidebarMenuButton*/}

                {/*            tooltip="Quick Create"*/}
                {/*            className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"*/}
                {/*        >*/}
                {/*            <PlusCircleIcon />*/}
                {/*            <span>Quick Create</span>*/}
                {/*        </SidebarMenuButton>*/}
                {/*        <Button*/}
                {/*            size="icon"*/}
                {/*            className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"*/}
                {/*            variant="outline"*/}
                {/*        >*/}
                {/*            <MailIcon />*/}
                {/*            <span className="sr-only">Inbox</span>*/}
                {/*        </Button>*/}
                {/*    </SidebarMenuItem>*/}
                {/*</SidebarMenu>*/}
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton size={'default'} isActive={getIsActive(item.url)} tooltip={item.title} asChild>
                                <Link href={item.url}>
                                    {item.icon && <item.icon/>}
                                    <span>{item.title}</span>
                                </Link>

                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
