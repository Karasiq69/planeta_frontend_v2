"use client"
import {
    AudioWaveform,
    BookDashed,
    BriefcaseBusiness,
    Calendar,
    Car,
    CarFront,
    FileText,
    HelpCircle,
    LayoutDashboard,
    Settings,
    ShoppingCart,
    Users,
    Wallet,
    Warehouse,
} from "lucide-react"
import * as React from "react"

import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "@/components/ui/sidebar"
import {TeamSwitcher} from "@/components/common/sidebar/team-switcher";
import {NavMain} from "@/components/common/sidebar/nav-main";
import {NavUser} from "@/components/common/sidebar/nav-user";
import {NavWarehouse} from "@/components/common/sidebar/nav-warehouse";
import {NavBottom} from "@/components/common/sidebar/nav-bottom";
import {NavIntro} from "@/components/common/sidebar/nav-intro";
import {INVENTORY_DOCUMENTS_URL} from "@/lib/constants";
import {InventoryDocumentType} from "@/features/inventory-documents/types";

const teams = [
    {
        name: "Planeta Mercedes",
        logo: CarFront,
        plan: "ИП Молдован Е.С.",
    },
    {
        name: "Попов Е.А.",
        logo: AudioWaveform,
        plan: "",
    },
]
const data = {
    intro: [
        {
            title: "Календарь",
            url: "/calendar",
            icon: Calendar,
        },
        {
            title: "Дашборд",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
    ],
    navMain: [
        {
            title: "Заявки на ремонт",
            url: "/applications",
            icon: BookDashed,
        },
        {
            title: "Заказ-наряды",
            url: "/orders",
            icon: FileText,
        },
        {
            title: "Клиенты",
            url: "/clients",
            icon: Users,
        },
        {
            title: "Автомобили",
            url: "/cars",
            icon: Car,
        },
        {
            title: "Платежи",
            url: "/payments",
            icon: Wallet,
        },
    ],
    navBottom: [
        {
            title: "Настройки",
            url: "/settings",
            icon: Settings,
        },
        {
            title: "Помощь",
            url: "/help",
            icon: HelpCircle,
        },
    ],
    // warehouse: [
    //     {
    //         name: "Склад",
    //         url: "/warehouse",
    //         icon: Warehouse,
    //     },
    //     {
    //         name: "Движения товаров",
    //         url: "/warehouse/transactions",
    //         icon: ArrowRight,
    //     },
    //     {
    //         name: "Накладные",
    //         url: "/inventory-documents",
    //         icon: ClipboardList,
    //     },
    //     {
    //         name: "Номенклатура",
    //         url: "/products",
    //         icon: FileSpreadsheet,
    //     },
    // ],
    organizations: [
        {
            name: "Организации",
            url: "/organizations",
            icon: BriefcaseBusiness,
        }
    ],
    products: [
        {
            title: "Товары и запчасти",
            url: "/products",
            icon: ShoppingCart,
        }
    ],
    warehouse: [
        {
            title: "Склад",
            url: "#",
            icon: Warehouse,
            isActive: true,
            items: [
                {
                    title: "Товары на складе",
                    url: "/warehouse",
                },
                {
                    title: "Приходные накладные",
                    url: `${INVENTORY_DOCUMENTS_URL}/${InventoryDocumentType.RECEIPT.toLowerCase()}`,

                },
                {
                    title: "Перемещения товаров",
                    url: `${INVENTORY_DOCUMENTS_URL}/${InventoryDocumentType.TRANSFER.toLowerCase()}`,
                },
                {
                    title: "_Расходные накладные",
                    url: `${INVENTORY_DOCUMENTS_URL}/${InventoryDocumentType.EXPENSE.toLowerCase()}`,
                },
                {
                    title: "_Возвраты",
                    url: `${INVENTORY_DOCUMENTS_URL}/${InventoryDocumentType.RETURN.toLowerCase()}`,
                },

                {
                    title: "--Документы",
                    url: "/inventory-documents",
                },
                {
                    title: "--Движения товаров",
                    url: "/warehouse/transactions",
                },

            ],
        },
    ],
}


export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props} variant={'sidebar'}>
            <SidebarHeader>
                <TeamSwitcher teams={teams}/>
            </SidebarHeader>
            <SidebarContent>
                <NavIntro items={data.intro}/>
                <NavMain items={data.navMain}/>
                <NavIntro items={data.products}/>
                <NavWarehouse items={data.warehouse}/>

                <NavBottom items={data.navBottom} className="mt-auto"/>
            </SidebarContent>
            {/*<SidebarContent>*/}
            {/*  <NavMain/>*/}

            {/*  <NavSettings/>*/}
            {/*</SidebarContent>*/}

            <SidebarFooter>
                <NavUser/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
