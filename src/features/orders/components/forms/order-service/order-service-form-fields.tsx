import { UseFormReturn } from "react-hook-form";
import { OrderServiceFormData } from "./schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  form: UseFormReturn<OrderServiceFormData>;
}

export const OrderServiceFormFields = ({ form }: Props) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="serviceId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Услуга</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="defaultDuration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Длительность (минуты)</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="appliedRate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Применяемая ставка</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="appliedPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Применяемая цена</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="discountPercent"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Скидка (%)</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="startTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Время начала</FormLabel>
            <FormControl>
              <Input type="datetime-local" {...field} value={field.value || ''} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="endTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Время окончания</FormLabel>
            <FormControl>
              <Input type="datetime-local" {...field} value={field.value || ''} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}; 