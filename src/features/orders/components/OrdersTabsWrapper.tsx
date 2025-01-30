import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent} from "@/components/ui/card";
import React from "react";
import {Bolt, NotepadText, UserRoundCog} from "lucide-react";
import {TableDemo} from "@/app/(crm)/clients/[id]/testTableDelete";
import {Badge} from "@/components/ui/badge";

const tabsConfig = [
    {
        id: 'works',
        value: 'account',
        label: 'Работы',
        icon: NotepadText,
        content: {
            title: 'Выполненные работы',
            description: 'Список оказанных услуг по заказу',
            footer: 'Общая стоимость работ: 12 500 ₽',
            children: (
                <TableDemo/>
            )
        }
    },
    {
        id: 'parts',
        value: 'password2',
        label: 'Товары и Запчасти',
        icon: Bolt,
        content: {
            title: 'Использованные запчасти',
            description: 'Список материалов и комплектующих',
            footer: 'Общая стоимость запчастей: 24 300 ₽',
            children: (
                <TableDemo/>
            )
        }
    },
    {
        id: 'executors',
        value: 'password3',
        label: 'Исполнители',
        icon: UserRoundCog,
        content: {
            title: 'Ответственные сотрудники',
            description: 'Исполнители работ по заказу',
            footer: 'Главный механик: Иванов П.С.',
            children: (
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="border p-4 rounded">
                        <h4 className="font-medium">Иванов Петр Сергеевич</h4>
                        <p className="text-sm text-muted-foreground">Старший механик</p>
                        <div className="mt-2 text-sm">
                            <p>Телефон: +7 999 123-45-67</p>
                            <p>Выполненные работы: 2</p>
                        </div>
                    </div>
                    <div className="border p-4 rounded">
                        <h4 className="font-medium">Сидоров Алексей Викторович</h4>
                        <p className="text-sm text-muted-foreground">Электрик</p>
                        <div className="mt-2 text-sm">
                            <p>Телефон: +7 999 765-43-21</p>
                            <p>Выполненные работы: 1</p>
                        </div>
                    </div>
                </div>
            )
        }
    },
    {
        id: 'other',
        value: 'password4',
        label: 'Прочее',
        icon: UserRoundCog,
        content: {
            title: 'Дополнительная информация',
            description: 'Примечания и вложения',
            footer: 'Дата следующего ТО: 15.03.2024',
            children: (
                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium">Комментарий клиента:</h4>
                        <p className="text-sm text-muted-foreground italic">
                            "Прошу проверить дополнительно работу кондиционера,
                            появился посторонний шум при включении"
                        </p>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Прикрепленные файлы:</h4>
                        <div className="flex gap-2">
                            <div className="border p-2 rounded text-sm">
                                📎 photo_breakdown.jpg
                            </div>
                            <div className="border p-2 rounded text-sm">
                                📎 diagnostic_report.pdf
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
];
type Props = {};
const OrdersTabsWrapper = (props: Props) => {
    return (
        <Tabs defaultValue={tabsConfig[0].value} className="w-full">
            <TabsList className=" flex items-start justify-start h-auto  ">
                {tabsConfig.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <TabsTrigger
                            key={tab.id}
                            value={tab.value}
                            className="flex gap-2 items-center h-10  data-state=[active]:shadow-md      "
                        >
                            <Icon size={16}/>
                            {tab.label}
                            <Badge variant={'outline'}>10</Badge>
                        </TabsTrigger>
                    );
                })}
            </TabsList>

            {tabsConfig.map((tab) => (
                <TabsContent key={tab.id} value={tab.value}>
                    <Card className={'  '}>

                        <CardContent className={'p-0'}>
                            {tab.content.children}
                        </CardContent>

                    </Card>
                </TabsContent>
            ))}
        </Tabs>
    );
};
export default OrdersTabsWrapper;
