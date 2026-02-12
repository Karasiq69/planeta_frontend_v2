
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { OrderServiceFormData } from './schema'
import type { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<OrderServiceFormData>
}

export const OrderServiceFormFields = ({ form }: Props) => {
  return (
    <div className='space-y-4'>
      <FormField
        control={form.control}
        name='defaultDuration'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Длительность (минуты)</FormLabel>
            <FormControl>
              <Input type='number' {...field} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='appliedRate'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Применяемая ставка</FormLabel>
            <FormControl>
              <Input type='number' {...field} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='appliedPrice'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Применяемая цена</FormLabel>
            <FormControl>
              <Input type='number' {...field} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='discountPercent'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Скидка (%)</FormLabel>
            <FormControl>
              <Input type='number' {...field} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
