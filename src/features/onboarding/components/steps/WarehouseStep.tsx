'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Warehouse } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { mockWarehouse } from '../../mock-data'
import { WarehouseFormData } from '../../types'

const schema = z.object({
  name: z.string().min(1, 'Введите название'),
  address: z.string().min(1, 'Введите адрес'),
})

type Props = {
  defaultValues?: WarehouseFormData | null
  onSubmit: (data: WarehouseFormData) => void
}

export function WarehouseStep({ defaultValues, onSubmit }: Props) {
  const form = useForm<WarehouseFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? mockWarehouse,
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Warehouse className="h-5 w-5 text-primary" />
          <CardTitle>Склад</CardTitle>
        </div>
        <CardDescription>Данные вашего склада</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id="step-3-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem>
                <FormLabel>Адрес</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
