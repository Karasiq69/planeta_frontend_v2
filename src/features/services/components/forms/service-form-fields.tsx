
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import type { ServiceFormData } from './schema'
import type { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<ServiceFormData>
}

export const ServiceFormFields = ({ form }: Props) => {
  return (
    <div className='space-y-4'>
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Название услуги</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Описание <span className="text-muted-foreground"> (не обязательно)</span>
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='defaultDuration'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Длительность (минуты)</FormLabel>
            <FormControl>
              <Input
                type='number'
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
