import { CalendarIcon, FileDown, Plus, Warehouse } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

const _ReceiptDocumentForm = () => {
  return (
    <section className='space-y-5'>
      <Card className=''>
        {/*<CardHeader className="bg-muted rounded-t-lg mb-5">*/}
        {/*    /!*<div className="flex gap-3 items-center justify-start">*!/*/}
        {/*    /!*    <Button variant="default" size="sm"><ListChecks/> Провести и закрыть</Button>*!/*/}
        {/*    /!*    <Button variant="secondary" size="sm"><ListChecks/> Провести</Button>*!/*/}
        {/*    /!*    <Button variant="outline" disabled size="sm"><BookDashed/> Сохранить черновик</Button>*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    /!*<CardTitle>Заполните форму</CardTitle> *!/*/}
        {/*</CardHeader>*/}

        <CardHeader className='max-w-6xl'>
          <>
            {/*<div className="  ">*/}
            {/*    <div className="grid grid-cols-1  gap-x-20 gap-y-3">*/}
            {/*        /!* Левая колонка *!/*/}
            {/*        <div className="col-span-1">*/}
            {/*            <div className="space-y-3">*/}
            {/*                <div className="grid grid-cols-3 items-center">*/}
            {/*                    <Label htmlFor="supplier" className="text-gray-600">Поставщик:</Label>*/}
            {/*                    <Select defaultValue="motex">*/}
            {/*                        <SelectTrigger id="supplier" className={'col-span-2'}>*/}
            {/*                            <SelectValue placeholder="Выберите поставщика" />*/}
            {/*                        </SelectTrigger>*/}
            {/*                        <SelectContent>*/}
            {/*                            <SelectItem value="motex">МОТЕКС-РУС ООО</SelectItem>*/}
            {/*                            <SelectItem value="other1">ТД Комплект ООО</SelectItem>*/}
            {/*                            <SelectItem value="other2">Стройматериалы ООО</SelectItem>*/}
            {/*                        </SelectContent>*/}
            {/*                    </Select>*/}
            {/*                </div>*/}

            {/*                <div className="grid md:grid-cols-3 items-center">*/}
            {/*                    <Label htmlFor="contract1" className="text-gray-600">Договор:</Label>*/}
            {/*                    <Select>*/}
            {/*                        <SelectTrigger id="contract1" className={'col-span-2'}>*/}
            {/*                            <SelectValue placeholder="Выберите договор" />*/}
            {/*                        </SelectTrigger>*/}
            {/*                        <SelectContent>*/}
            {/*                            <SelectItem value="main">Основной до</SelectItem>*/}
            {/*                            <SelectItem value="other1">Договор поставки №127/22</SelectItem>*/}
            {/*                            <SelectItem value="other2">Договор №45-В от 15.01.2025</SelectItem>*/}
            {/*                        </SelectContent>*/}
            {/*                    </Select>*/}
            {/*                </div>*/}

            {/*                <div className="grid grid-cols-3 items-center">*/}
            {/*                    <Label htmlFor="order" className="text-gray-600">Заказ:</Label>*/}
            {/*                    <Select>*/}
            {/*                        <SelectTrigger id="order" className={'col-span-2'}>*/}
            {/*                            <SelectValue placeholder="Выберите заказ" />*/}
            {/*                        </SelectTrigger>*/}
            {/*                        <SelectContent>*/}
            {/*                            <SelectItem value="order1">Заказ №123 от 15.02.2025</SelectItem>*/}
            {/*                            <SelectItem value="order2">Заказ №124 от 16.02.2025</SelectItem>*/}
            {/*                            <SelectItem value="order3">Заказ №125 от 17.02.2025</SelectItem>*/}
            {/*                        </SelectContent>*/}
            {/*                    </Select>*/}
            {/*                </div>*/}

            {/*                <div className="grid grid-cols-3 items-center">*/}
            {/*                    <Label htmlFor="warehouse" className="text-gray-600">Склад:</Label>*/}
            {/*                    <Select defaultValue="marinin">*/}
            {/*                        <SelectTrigger id="warehouse" className={'col-span-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80'}>*/}
            {/*                            <SelectValue placeholder="Выберите склад" />*/}
            {/*                        </SelectTrigger>*/}
            {/*                        <SelectContent className={'className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"'}>*/}
            {/*                            <SelectItem value="marinin" className={'flex gap-2'}>*/}
            {/*                                <Warehouse size={16} aria-hidden="true" />*/}
            {/*                                Склад Маринин А.С.*/}
            {/*                            </SelectItem>*/}
            {/*                            <SelectItem value="central">*/}
            {/*                                <Warehouse size={16} aria-hidden="true" />*/}

            {/*                                Центральный склад</SelectItem>*/}
            {/*                            <SelectItem value="retail">*/}
            {/*                                <Warehouse size={16} aria-hidden="true" />*/}
            {/*                                Розничный склад</SelectItem>*/}
            {/*                        </SelectContent>*/}
            {/*                    </Select>*/}
            {/*                </div>*/}

            {/*            </div>*/}
            {/*        </div>*/}

            {/*        /!* Правая колонка *!/*/}
            {/*        <div className="col-span-1">*/}
            {/*            <div className="space-y-3">*/}
            {/*                <div className="grid grid-cols-2 items-center">*/}
            {/*                    <Label htmlFor="inNumber" className="text-gray-600">Вх. номер:</Label>*/}
            {/*                    <Input id="inNumber" defaultValue="56454564" />*/}
            {/*                </div>*/}

            {/*                <div className="grid grid-cols-2 items-center">*/}
            {/*                    <Label htmlFor="operation" className="text-gray-600">Операция:</Label>*/}
            {/*                    <Select defaultValue="supply">*/}
            {/*                        <SelectTrigger id="operation">*/}
            {/*                            <SelectValue placeholder="Выберите операцию" />*/}
            {/*                        </SelectTrigger>*/}
            {/*                        <SelectContent>*/}
            {/*                            <SelectItem value="supply">Поступление от поставщика</SelectItem>*/}
            {/*                            <SelectItem value="return">Возврат поставщику</SelectItem>*/}
            {/*                            <SelectItem value="exchange">Обмен товаров</SelectItem>*/}
            {/*                        </SelectContent>*/}
            {/*                    </Select>*/}
            {/*                </div>*/}

            {/*                <div className="grid grid-cols-2 items-center">*/}
            {/*                    <Label htmlFor="organization" className="text-gray-600">Организация:</Label>*/}
            {/*                    <Select defaultValue="ip">*/}
            {/*                        <SelectTrigger id="organization">*/}
            {/*                            <SelectValue placeholder="Выберите организацию" />*/}
            {/*                        </SelectTrigger>*/}
            {/*                        <SelectContent>*/}
            {/*                            <SelectItem value="ip">ИП Молдован Е.С.</SelectItem>*/}
            {/*                            <SelectItem value="ooo">ООО "Торговый Дом"</SelectItem>*/}
            {/*                            <SelectItem value="zao">ЗАО "Инвест-Групп"</SelectItem>*/}
            {/*                        </SelectContent>*/}
            {/*                    </Select>*/}
            {/*                </div>*/}

            {/*                <div className="grid grid-cols-2 items-center">*/}
            {/*                    <Label htmlFor="date-input" className="text-gray-600">от:</Label>*/}
            {/*                    <Popover>*/}
            {/*                        <PopoverTrigger asChild>*/}
            {/*                            <Button*/}
            {/*                                id="date-input"*/}
            {/*                                variant="outline"*/}
            {/*                                className={cn("justify-start text-left font-normal")}*/}
            {/*                            >*/}
            {/*                                /!*<Calendar className="mr-2 h-4 w-4" />*!/*/}
            {/*                              asddas  /!*{format(date, "dd.MM.yyyy", { locale: ru })}*!/*/}
            {/*                            </Button>*/}
            {/*                        </PopoverTrigger>*/}
            {/*                        <PopoverContent className="w-auto p-0" align="start">*/}
            {/*                            <div className="p-2">*/}
            {/*                                <div className="space-y-2">*/}
            {/*                                    <div className="grid grid-cols-7">*/}
            {/*                                        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (*/}
            {/*                                            <div key={day} className="text-center text-xs text-muted-foreground">*/}
            {/*                                                {day}*/}
            {/*                                            </div>*/}
            {/*                                        ))}*/}
            {/*                                    </div>*/}
            {/*                                    <div className="grid grid-cols-7 gap-1">*/}
            {/*                                        /!*{Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (*!/*/}
            {/*                                        /!*    <Button*!/*/}
            {/*                                        /!*        key={day}*!/*/}
            {/*                                        /!*        variant={day === date.getDate() ? "default" : "ghost"}*!/*/}
            {/*                                        /!*        className="h-8 w-8 p-0 font-normal"*!/*/}
            {/*                                        /!*        onClick={() => {*!/*/}
            {/*                                        /!*            const newDate = new Date(date);*!/*/}
            {/*                                        /!*            newDate.setDate(day);*!/*/}
            {/*                                        /!*            setDate(newDate);*!/*/}
            {/*                                        /!*        }}*!/*/}
            {/*                                        /!*    >*!/*/}
            {/*                                        /!*        {day}*!/*/}
            {/*                                        /!*    </Button>*!/*/}
            {/*                                        /!*))}*!/*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </PopoverContent>*/}
            {/*                    </Popover>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        /!* Дополнительные поля (третья колонка, занимающая всю ширину) *!/*/}
            {/*        <div className="col-span-3 mt-4">*/}
            {/*            <div className="flex items-center gap-4">*/}
            {/*                <Select defaultValue="cell">*/}
            {/*                    <SelectTrigger className="w-32" id="cell">*/}
            {/*                        <SelectValue placeholder="Ячейка" />*/}
            {/*                    </SelectTrigger>*/}
            {/*                    <SelectContent>*/}
            {/*                        <SelectItem value="cell">Ячейка</SelectItem>*/}
            {/*                        <SelectItem value="cell1">Ячейка А1</SelectItem>*/}
            {/*                        <SelectItem value="cell2">Ячейка Б3</SelectItem>*/}
            {/*                    </SelectContent>*/}
            {/*                </Select>*/}
            {/*                <div className="flex items-center gap-2">*/}
            {/*                    <Checkbox id="production" />*/}
            {/*                    <Label htmlFor="production" className="text-gray-600">*/}
            {/*                        Производство и пр. (УСН)*/}
            {/*                    </Label>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
          </>
          <div className='grid lg:grid-cols-2 gap-x-20 gap-y-2 mb-4'>
            <div className='flex items-center'>
              <Label htmlFor='supplier' className='w-28 text-muted-foreground'>
                Поставщик:
              </Label>
              <div className='flex-1 flex gap-1'>
                <Select>
                  <SelectTrigger className='flex-1'>
                    <SelectValue placeholder='Выберите поставщика' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>МОТЕХС-РУС ООО</SelectItem>
                    <SelectItem value='2'>АвтоЗапчасти ООО</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='flex items-center'>
              <Label htmlFor='docNumber' className='w-28 text-muted-foreground'>
                Номер:
              </Label>
              <div className='flex-1 flex gap-1 items-center'>
                <Input id='docNumber' className='flex-1' disabled />
                <Label className='w-8 text-center'>от</Label>
                <div className='flex gap-1'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className={cn('w-[240px] pl-3 text-left font-normal')}
                      >
                        Выбрать дату
                        {/*{field.value ? (*/}
                        {/*    format(field.value, "PPP")*/}
                        {/*) : (*/}
                        {/*    <span>Pick a date</span>*/}
                        {/*)}*/}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className='flex items-center'>
              <Label htmlFor='contract' className='w-28 text-muted-foreground'>
                Договор:
              </Label>
              <div className='flex-1 flex gap-1 items-center'>
                <Select>
                  <SelectTrigger className='flex-1'>
                    <SelectValue placeholder='Выберите договор' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>Основной договор Маринин А.С.</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant='outline' size='icon' className='h-10 w-8' disabled>
                  <FileDown className='h-4 w-4' />
                </Button>
              </div>
            </div>
            <div className='flex items-center'>
              <Label htmlFor='extNumber' className='w-28 text-muted-foreground'>
                Вх. номер:
              </Label>
              <div className='flex-1 flex gap-1 items-center'>
                <Input id='extNumber' placeholder='Входящий номер' className='flex-1' />
                <Label className='w-8 text-center'>от</Label>
                <Input type='date' className='w-40' />
              </div>
            </div>

            <div className='flex items-center'>
              <Label htmlFor='order' className='w-28 text-muted-foreground'>
                Заказ:
              </Label>
              <div className='flex-1 flex gap-1'>
                <Select disabled>
                  <SelectTrigger className='flex-1'>
                    <SelectValue placeholder='Связанный заказ' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>Заказ №123</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='flex items-center'>
              <Label htmlFor='operation' className='w-28 text-muted-foreground'>
                Операция:
              </Label>
              <div className='flex-1'>
                <Select defaultValue='receipt'>
                  <SelectTrigger className='flex-1'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='receipt'>Поступление от поставщика</SelectItem>
                    <SelectItem value='return'>Возврат от клиента</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='flex items-center'>
              <Label htmlFor='warehouse' className='w-28 text-muted-foreground'>
                Склад:
              </Label>
              <div className='flex-1 flex gap-1'>
                <Select defaultValue='marinin'>
                  <SelectTrigger
                    id='warehouse'
                    className='col-span-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80'
                  >
                    <SelectValue placeholder='Выберите склад' />
                  </SelectTrigger>
                  <SelectContent className='className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"'>
                    <SelectItem value='marinin' className='flex gap-2'>
                      <Warehouse size={16} aria-hidden='true' />
                      Склад Маринин А.С.
                    </SelectItem>
                    <SelectItem value='central'>
                      <Warehouse size={16} aria-hidden='true' />
                      Центральный склад
                    </SelectItem>
                    <SelectItem value='retail'>
                      <Warehouse size={16} aria-hidden='true' />
                      Розничный склад
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='flex items-center'>
              <Label htmlFor='organization' className='w-28 text-muted-foreground'>
                Организация:
              </Label>
              <div className='flex-1 flex gap-1'>
                <Select>
                  <SelectTrigger className='flex-1'>
                    <SelectValue placeholder='Выберите организацию' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>ИП Молдован Екатерина Станиславовна</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant='outline' size='icon' className='h-10 w-8'>
                  <FileDown className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className='bg-muted'>
        <>
          <CardHeader className=' w-full space-y-5  '>
            <div className='flex gap-2'>
              <Button variant='outline' size='sm'>
                <Plus className='h-4 w-4 mr-1' /> Добавить
              </Button>
              <Button variant='outline' size='sm' disabled>
                Подобрать
              </Button>
              <Button variant='outline' size='icon' className='h-8 w-8' disabled>
                <FileDown className='h-4 w-4' />
              </Button>
              <Button variant='outline' size='sm' disabled>
                Изменить
              </Button>
            </div>
          </CardHeader>
          <CardContent className='rounded-lg'>
            <Card className=''>
              {/*<CardHeader*/}
              {/*    className={'flex flex-row items-center space-y-0 justify-between     border-b rounded-lg rounded-b-none'}>*/}
              {/*    <Input/>*/}
              {/*    <CreateOrderServiceButton/>*/}
              {/*</CardHeader>*/}
              <div className=' [&>div]:max-h-[500px] p-2'>
                <Table className='table-auto '>
                  <TableHeader className='sticky top-0 z-10 bg-background/90 backdrop-blur-xs'>
                    <TableRow>
                      <TableHead className='w-12'>№</TableHead>
                      <TableHead>Номенклатура</TableHead>
                      <TableHead>Производитель</TableHead>
                      <TableHead>Артикул</TableHead>
                      <TableHead className='w-24'>Количество</TableHead>
                      <TableHead className='w-24'>Цена</TableHead>
                      <TableHead>Ячейка</TableHead>
                      <TableHead>Партия</TableHead>
                      <TableHead className='w-16'>% НДС</TableHead>
                      <TableHead className='w-24'>Сумма НДС</TableHead>
                      <TableHead className='w-24'>Сумма</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody className=''>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Фильтр масляный</TableCell>
                      <TableCell>GATES</TableCell>
                      <TableCell>76457675</TableCell>
                      <TableCell>
                        <Input type='number' defaultValue='1.000' className='h-8' />
                      </TableCell>
                      <TableCell>
                        <Input type='number' defaultValue='541.00' className='h-8' />
                      </TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className='h-8'>
                            <SelectValue placeholder='Не выбрана' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='a123'>A-1-2-3</SelectItem>
                            <SelectItem value='b123'>B-1-2-3</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>20%</TableCell>
                      <TableCell>90.17</TableCell>
                      <TableCell>541.00</TableCell>
                    </TableRow>
                    <TableRow className='bg-yellow-50 '>
                      <TableCell>2</TableCell>
                      <TableCell>Бак AdBlue</TableCell>
                      <TableCell>MERCEDES</TableCell>
                      <TableCell>4474700015</TableCell>
                      <TableCell>
                        <Input type='number' defaultValue='1.000' className='h-8' />
                      </TableCell>
                      <TableCell>
                        <Input type='number' defaultValue='0.00' className='h-8' />
                      </TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className='h-8'>
                            <SelectValue placeholder='Не выбрана' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='a123'>A-1-2-3</SelectItem>
                            <SelectItem value='b123'>B-1-2-3</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>0%</TableCell>
                      <TableCell>0.00</TableCell>
                      <TableCell>0.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </CardContent>
        </>
      </Card>
    </section>
  )
}
export default _ReceiptDocumentForm
