'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Building2 } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { mockOrganization } from '../../mock-data'
import { OrganizationFormData } from '../../types'

const schema = z.object({
  name: z.string().min(1, 'Введите название'),
  inn: z.string().min(10, 'ИНН должен содержать минимум 10 цифр'),
  address: z.string().min(1, 'Введите адрес'),
  phone: z.string().min(1, 'Введите телефон'),
  email: z.string().email('Введите корректный email'),
})

type Props = {
  defaultValues?: OrganizationFormData | null
  onSubmit: (data: OrganizationFormData) => void
}

export function OrganizationStep({ defaultValues, onSubmit }: Props) {
  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? mockOrganization,
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <CardTitle>Организация</CardTitle>
        </div>
        <CardDescription>Основные данные вашей компании</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id="step-0-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="inn" render={({ field }) => (
                <FormItem>
                  <FormLabel>ИНН</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem>
                <FormLabel>Адрес</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input {...field} type="email" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
