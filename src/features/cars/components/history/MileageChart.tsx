'use client'

import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'

import type { ChartConfig } from '@/components/ui/chart'
import type { CarMileageRecord } from '@/features/cars/types'

interface MileageChartProps {
  data: CarMileageRecord[]
  isLoading: boolean
}

const chartConfig = {
  mileage: {
    label: 'Пробег',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const MileageChart = ({ data, isLoading }: MileageChartProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Пробег</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (data.length < 2) return null

  const chartData = [...data]
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((record) => ({
      date: record.createdAt,
      mileage: record.value,
    }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Пробег</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => {
                try {
                  return format(parseISO(val), 'dd.MM.yy', { locale: ru })
                } catch {
                  return val
                }
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${(val / 1000).toFixed(0)}т`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(val) => {
                    try {
                      return format(parseISO(val as string), 'dd MMMM yyyy', { locale: ru })
                    } catch {
                      return val as string
                    }
                  }}
                  formatter={(value) => [`${Number(value).toLocaleString('ru-RU')} км`, 'Пробег']}
                />
              }
            />
            <Area
              dataKey="mileage"
              type="monotone"
              fill="var(--color-mileage)"
              fillOpacity={0.15}
              stroke="var(--color-mileage)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default MileageChart
