import React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ArrowLeft, ArrowRight, ClipboardCopy, FileDown, FilePlus, FileText, Plus, Printer} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

const _ReceiptDocumentForm = () => {
    return (
        <div className="w-full bg-gray-50 p-1 border rounded-md">
            {/* Верхняя навигация и заголовок */}
            <div className="flex items-center gap-2 mb-3">
                <Button variant="outline" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                    <ArrowRight className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-medium">Приходная накладная (создание) *</h2>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ClipboardCopy className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Вкладки */}
            <Tabs defaultValue="main">
                <TabsList className="bg-white border-b border-gray-200 w-full justify-start rounded-none h-8">
                    <TabsTrigger value="main" className="data-[state=active]:bg-gray-100 rounded-none h-8">Основное</TabsTrigger>
                    <TabsTrigger value="events" className="data-[state=active]:bg-gray-100 rounded-none h-8">События</TabsTrigger>
                    <TabsTrigger value="files" className="data-[state=active]:bg-gray-100 rounded-none h-8">Файлы</TabsTrigger>
                    <TabsTrigger value="reports" disabled className="data-[state=active]:bg-gray-100 rounded-none h-8">Отчеты</TabsTrigger>
                </TabsList>

                <TabsContent value="main" className="mt-0 p-4 bg-white border-x border-b">
                    {/* Кнопки действий */}
                    <div className="flex gap-2 mb-4">
                        <Button className="bg-yellow-500 hover:bg-yellow-600">
                            Провести и закрыть
                        </Button>
                        <Button variant="outline">
                            Записать
                        </Button>
                        <Button variant="outline">
                            Провести
                        </Button>
                        <div className="border rounded-md flex">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-r-none">
                                <Printer className="h-4 w-4" />
                            </Button>
                            <Select disabled>
                                <SelectTrigger className="h-9 w-10 border-l rounded-l-none">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="print">Печать</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="border rounded-md flex">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-r-none">
                                <FilePlus className="h-4 w-4" />
                            </Button>
                            <Select disabled>
                                <SelectTrigger className="h-9 w-10 border-l rounded-l-none">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="create">Создать</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="ml-auto">
                            <Select disabled>
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Еще" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="more">Дополнительно</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Форма - верхняя часть */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                        <div className="flex items-center">
                            <Label htmlFor="supplier" className="w-28">Поставщик:</Label>
                            <div className="flex-1 flex gap-1">
                                <Select>
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Выберите поставщика" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">МОТЕХС-РУС ООО</SelectItem>
                                        <SelectItem value="2">АвтоЗапчасти ООО</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon" className="h-10 w-8">
                                    <FileDown className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="docNumber" className="w-28">Номер:</Label>
                            <div className="flex-1 flex gap-1">
                                <Input id="docNumber" defaultValue="авто" className="flex-1" />
                                <Label className="w-8 text-center">от</Label>
                                <div className="flex gap-1">
                                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-40" />
                                    <Input type="time" disabled className="w-32" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Label htmlFor="contract" className="w-28">Договор:</Label>
                            <div className="flex-1 flex gap-1">
                                <Select>
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Выберите договор" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Основной договор Маринин А.С.</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon" className="h-10 w-8">
                                    <FileDown className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="extNumber" className="w-28">Вх. номер:</Label>
                            <div className="flex-1 flex gap-1">
                                <Input id="extNumber" placeholder="Входящий номер" className="flex-1" />
                                <Label className="w-8 text-center">от</Label>
                                <Input type="date" className="w-40" />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Label htmlFor="order" className="w-28">Заказ:</Label>
                            <div className="flex-1 flex gap-1">
                                <Select disabled>
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Связанный заказ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Заказ №123</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon" className="h-10 w-8" disabled>
                                    <FileDown className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-10 w-8" disabled>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="operation" className="w-28">Операция:</Label>
                            <div className="flex-1">
                                <Select defaultValue="receipt">
                                    <SelectTrigger className="flex-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="receipt">Поступление от поставщика</SelectItem>
                                        <SelectItem value="return">Возврат от клиента</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Label htmlFor="warehouse" className="w-28">Склад:</Label>
                            <div className="flex-1 flex gap-1">
                                <Select>
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Выберите склад" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Склад Маринин А.С.</SelectItem>
                                        <SelectItem value="2">Основной склад</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon" className="h-10 w-8">
                                    <FileDown className="h-4 w-4" />
                                </Button>
                                <Select disabled>
                                    <SelectTrigger className="w-28">
                                        <SelectValue placeholder="Ячейка" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">А-1-2-3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="organization" className="w-28">Организация:</Label>
                            <div className="flex-1 flex gap-1">
                                <Select>
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Выберите организацию" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">ИП Молдован Екатерина Станиславовна</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon" className="h-10 w-8">
                                    <FileDown className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Табличная часть с товарами */}
                    <div className="mt-4">
                        <Tabs defaultValue="products">
                            <TabsList className="bg-gray-100 w-full justify-start rounded-none h-8">
                                <TabsTrigger value="products" className="data-[state=active]:bg-white rounded-none h-8">Товары (2)</TabsTrigger>
                                <TabsTrigger value="services" className="data-[state=active]:bg-white rounded-none h-8" disabled>Услуги</TabsTrigger>
                                <TabsTrigger value="payment" className="data-[state=active]:bg-white rounded-none h-8" disabled>Оплата (Автоматически)</TabsTrigger>
                                <TabsTrigger value="additional" className="data-[state=active]:bg-white rounded-none h-8" disabled>Дополнительно</TabsTrigger>
                            </TabsList>

                            <TabsContent value="products" className="mt-0 border p-0">
                                <div className="flex gap-2 p-2 bg-gray-50 border-b">
                                    <Button variant="outline" size="sm">
                                        <Plus className="h-4 w-4 mr-1" /> Добавить
                                    </Button>
                                    <Button variant="outline" size="sm" disabled>
                                        Подобрать
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                                        <FileDown className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" disabled>
                                        Изменить
                                    </Button>
                                </div>

                                <div className="overflow-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                        <tr className="bg-gray-50">
                                            <th className="border p-2 text-left w-12">№</th>
                                            <th className="border p-2 text-left">Номенклатура</th>
                                            <th className="border p-2 text-left">Производитель</th>
                                            <th className="border p-2 text-left">Артикул</th>
                                            <th className="border p-2 text-left w-24">Количество</th>
                                            <th className="border p-2 text-left w-24">Цена</th>
                                            <th className="border p-2 text-left">Ячейка</th>
                                            <th className="border p-2 text-left">Партия</th>
                                            <th className="border p-2 text-left w-16">% НДС</th>
                                            <th className="border p-2 text-left w-24">Сумма НДС</th>
                                            <th className="border p-2 text-left w-24">Сумма</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="border p-2">1</td>
                                            <td className="border p-2">Фильтр масляный</td>
                                            <td className="border p-2">GATES</td>
                                            <td className="border p-2">76457675</td>
                                            <td className="border p-2">
                                                <Input type="number" defaultValue="1.000" className="h-8" />
                                            </td>
                                            <td className="border p-2">
                                                <Input type="number" defaultValue="541.00" className="h-8" />
                                            </td>
                                            <td className="border p-2">
                                                <Select>
                                                    <SelectTrigger className="h-8">
                                                        <SelectValue placeholder="Не выбрана" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="a123">A-1-2-3</SelectItem>
                                                        <SelectItem value="b123">B-1-2-3</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </td>
                                            <td className="border p-2"></td>
                                            <td className="border p-2">20%</td>
                                            <td className="border p-2">90.17</td>
                                            <td className="border p-2">541.00</td>
                                        </tr>
                                        <tr className="bg-yellow-50">
                                            <td className="border p-2">2</td>
                                            <td className="border p-2">Бак AdBlue</td>
                                            <td className="border p-2">MERCEDES</td>
                                            <td className="border p-2">4474700015</td>
                                            <td className="border p-2">
                                                <Input type="number" defaultValue="1.000" className="h-8" />
                                            </td>
                                            <td className="border p-2">
                                                <Input type="number" defaultValue="0.00" className="h-8" />
                                            </td>
                                            <td className="border p-2">
                                                <Select>
                                                    <SelectTrigger className="h-8">
                                                        <SelectValue placeholder="Не выбрана" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="a123">A-1-2-3</SelectItem>
                                                        <SelectItem value="b123">B-1-2-3</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </td>
                                            <td className="border p-2"></td>
                                            <td className="border p-2">0%</td>
                                            <td className="border p-2">0.00</td>
                                            <td className="border p-2">0.00</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Нижняя часть с комментарием и итогами */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="comment">Комментарий</Label>
                            <Textarea id="comment" className="h-20" />
                        </div>
                        <div>
                            <div className="flex justify-end mb-2">
                                <Label className="w-32 text-right pr-2">Скидка руч. %:</Label>
                                <Input type="number" defaultValue="0.00" className="w-24" disabled />
                                <Label className="w-32 text-right pl-2 pr-2">НДС:</Label>
                                <Input type="text" defaultValue="90.17" className="w-24" disabled />
                            </div>
                            <div className="flex justify-end mb-2">
                                <Label className="w-32 text-right pr-2">Скидка руч. ₽:</Label>
                                <Input type="number" defaultValue="0.00" className="w-24" disabled />
                                <Label className="w-24 text-right pl-2 pr-2">Всего:</Label>
                                <Input type="text" defaultValue="541.00" className="w-24" disabled />
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="events" className="mt-0">
                    <div className="p-4 text-center text-gray-500">
                        События документа будут отображаться здесь
                    </div>
                </TabsContent>

                <TabsContent value="files" className="mt-0">
                    <div className="p-4 text-center text-gray-500">
                        Прикрепленные файлы будут отображаться здесь
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};
export default _ReceiptDocumentForm;