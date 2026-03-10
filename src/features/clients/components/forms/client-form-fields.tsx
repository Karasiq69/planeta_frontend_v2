'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import type { ClientFormData } from '@/features/clients/components/forms/schema'
import type { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<ClientFormData>
}

const ClientFormFields = ({ form }: Props) => {
  const clientType = form.watch('type')

  return (
    <div className='flex flex-col gap-5'>
      <Tabs
        value={clientType}
        onValueChange={(value) => form.setValue('type', value as 'individual' | 'legal_entity')}
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='individual'>Физлицо</TabsTrigger>
          <TabsTrigger value='legal_entity'>Юрлицо</TabsTrigger>
        </TabsList>
      </Tabs>

      {clientType === 'legal_entity' && (
        <>
          <FormField
            control={form.control}
            name='companyName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название компании</FormLabel>
                <FormControl>
                  <Input placeholder='ООО "Ромашка"' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-3'>
            <FormField
              control={form.control}
              name='inn'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ИНН</FormLabel>
                  <FormControl>
                    <Input placeholder='7707123456' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='kpp'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>КПП</FormLabel>
                  <FormControl>
                    <Input placeholder='770701001' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Адрес</FormLabel>
                <FormControl>
                  <Input placeholder='г. Москва, ул. Примерная, д. 1' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <FormField
        control={form.control}
        name='lastName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{clientType === 'legal_entity' ? 'Фамилия контактного лица' : 'Фамилия'}</FormLabel>
            <FormControl>
              <Input placeholder='Иванов' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='firstName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{clientType === 'legal_entity' ? 'Имя контактного лица' : 'Имя'}</FormLabel>
            <FormControl>
              <Input placeholder='Иван' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='phone'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Телефон</FormLabel>
            <FormControl>
              <Input placeholder='+7 999 123 45 67' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type='email' placeholder='mail@mail.ru' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
export default ClientFormFields
