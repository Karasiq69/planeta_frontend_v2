import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React from "react";
import {Bolt, NotepadText, UserRoundCog} from "lucide-react";
import ServicesTabContent from "@/features/orders/components/order-tabs/order-services/servicesTabContent";
import ProductsTabContent from "@/features/orders/components/order-tabs/order-products/productsTabContent";

const tabsConfig = [
    {
        id: 'works',
        value: 'services',
        label: 'Работы',
        icon: NotepadText,
        children: (
            <ServicesTabContent/>
        )
    },
    {
        id: 'parts',
        value: 'parts',
        label: 'Товары и Запчасти',
        icon: Bolt,
        children: (
            <ProductsTabContent/>
        )
    },
    {
        id: 'executors',
        value: 'executors',
        label: 'Исполнители',
        icon: UserRoundCog,
        children: (
            <ServicesTabContent/>
        )
    },
    {
        id: 'other',
        value: 'other',
        label: 'Прочее',
        icon: UserRoundCog,
        children: (
            <ServicesTabContent/>
        )
    }
];
type Props = {};
const OrdersTabsWrapper = (props: Props) => {
    return (
        <Tabs defaultValue={tabsConfig[0].value} className="w-full bg-muted rounded-lg p-2 border">
            <TabsList className=" flex items-start justify-start h-auto p-0 gap-1">
                {tabsConfig.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <TabsTrigger
                            key={tab.id}
                            value={tab.value}
                            className="flex gap-2 rounded-md hover:bg-background/70 items-center h-10 border border-transparent data-[state=active]:border-border "
                        >
                            <Icon size={16}/>
                            {tab.label}
                        </TabsTrigger>
                    );
                })}
            </TabsList>

            {tabsConfig.map((tab) => (
                <TabsContent key={tab.id} value={tab.value}>
                    {tab.children}
                </TabsContent>
            ))}
        </Tabs>
    );
};
export default OrdersTabsWrapper;
