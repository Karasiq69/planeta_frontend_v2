import { ArrowRight, PenTool } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Тестовые данные с множественными услугами
const serviceHistory = [
  {
    id: 'ord_001',
    date: '12.01.2024',
    mechanic: 'Петров А.В.',
    status: 'Завершено',
    totalCost: 15600,
    services: [
      {
        name: 'Техническое обслуживание ТО-1',
        description: 'Замена масла Shell Helix 5W40, масляный фильтр, воздушный фильтр',
        cost: 8500,
      },
      {
        name: 'Шиномонтаж',
        description: 'Балансировка колес, замена резины',
        cost: 4600,
      },
      {
        name: 'Диагностика ходовой',
        description: 'Проверка состояния подвески',
        cost: 2500,
      },
    ],
  },
  {
    id: 'ord_002',
    date: '25.12.2023',
    mechanic: 'Сидоров И.И.',
    status: 'Завершено',
    totalCost: 22400,
    services: [
      {
        name: 'Замена передних амортизаторов',
        description: 'Амортизаторы KYB + работа',
        cost: 15800,
      },
      {
        name: 'Замена сайлентблоков',
        description: 'Передние рычаги, 4 шт',
        cost: 6600,
      },
    ],
  },
  {
    id: 'ord_003',
    date: '15.12.2023',
    mechanic: 'Иванов П.С.',
    status: 'В работе',
    totalCost: 34500,
    services: [
      {
        name: 'Техническое обслуживание ТО-2',
        description: 'Полное ТО включая замену ремня ГРМ',
        cost: 28000,
      },
      {
        name: 'Замена тормозных колодок',
        description: 'Передние + задние, Brembo',
        cost: 6500,
      },
    ],
  },
]

const CarServiceHistory = () => {
  const handleOrderClick = (orderId: string) => {
    console.log(`Переход к заказу: ${orderId}`)
    // Здесь будет навигация к заказу
  }

  const formatCost = (cost: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(cost)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <PenTool className='w-5 h-5' />
          История обслуживания
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Услуги</TableHead>
              <TableHead>Механик</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className='text-right'>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceHistory.map((record) => (
              <TableRow key={record.id}>
                <TableCell className='font-medium align-top'>{record.date}</TableCell>
                <TableCell>
                  <div className='space-y-2'>
                    {record.services.map((service, index) => (
                      <div key={index} className='border-b last:border-0 pb-2 last:pb-0'>
                        <div className='font-medium'>{service.name}</div>
                        <div className='text-sm text-gray-500'>{service.description}</div>
                        <div className='text-sm text-gray-500'>{formatCost(service.cost)}</div>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className='align-top'>{record.mechanic}</TableCell>
                <TableCell className='align-top font-medium'>
                  {formatCost(record.totalCost)}
                </TableCell>
                <TableCell className='align-top'>
                  <Badge variant={record.status === 'В работе' ? 'default' : 'secondary'}>
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell className='text-right align-top'>
                  <Button variant='ghost' size='icon' onClick={() => handleOrderClick(record.id)}>
                    <ArrowRight className='w-4 h-4' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default CarServiceHistory
