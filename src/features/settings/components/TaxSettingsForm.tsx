'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUpdateTaxSettings } from '@/features/organizations/api/mutations'
import type { Organization, TaxRegime } from '@/features/organizations/types'
import { useVatRates } from '@/features/vat-rates/api/queries'

const TAX_REGIME_OPTIONS: { value: string; label: string }[] = [
  { value: 'none', label: 'Не выбрано' },
  { value: 'osno', label: 'ОСНО' },
  { value: 'usn', label: 'УСН' },
  { value: 'usn_income', label: 'УСН доходы' },
  { value: 'usn_income_expense', label: 'УСН доходы-расходы' },
  { value: 'patent', label: 'Патент' },
  { value: 'eshn', label: 'ЕСХН' },
]

const taxSettingsSchema = z.object({
  taxRegime: z.string(),
  isVatPayer: z.boolean(),
  defaultVatRateId: z.string(),
  priceIncludesVat: z.boolean(),
})

type TaxSettingsFormValues = z.infer<typeof taxSettingsSchema>

interface Props {
  organization: Organization
}

export default function TaxSettingsForm({ organization }: Props) {
  const { data: vatRates = [] } = useVatRates({ active: true })
  const updateMutation = useUpdateTaxSettings()

  const form = useForm<TaxSettingsFormValues>({
    resolver: zodResolver(taxSettingsSchema),
    defaultValues: {
      taxRegime: organization.taxRegime ?? 'none',
      isVatPayer: organization.isVatPayer,
      defaultVatRateId: organization.defaultVatRateId?.toString() ?? 'none',
      priceIncludesVat: organization.priceIncludesVat,
    },
  })

  const onSubmit = (values: TaxSettingsFormValues) => {
    const taxRegime = values.taxRegime === 'none' ? null : (values.taxRegime as TaxRegime)
    const defaultVatRateId =
      values.defaultVatRateId === 'none' ? null : Number(values.defaultVatRateId)

    updateMutation.mutate({
      id: organization.id,
      data: {
        taxRegime,
        isVatPayer: values.isVatPayer,
        defaultVatRateId,
        priceIncludesVat: values.priceIncludesVat,
      },
    })
  }

  return (
    <Card>
      <CardContent className='pt-6'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-1.5'>
            <Label htmlFor='taxRegime'>Налоговый режим</Label>
            <Select
              value={form.watch('taxRegime')}
              onValueChange={(value) => form.setValue('taxRegime', value)}
            >
              <SelectTrigger id='taxRegime'>
                <SelectValue placeholder='Выберите режим' />
              </SelectTrigger>
              <SelectContent>
                {TAX_REGIME_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center gap-2'>
            <Checkbox
              id='isVatPayer'
              checked={form.watch('isVatPayer')}
              onCheckedChange={(checked) => form.setValue('isVatPayer', checked === true)}
            />
            <Label htmlFor='isVatPayer' className='cursor-pointer'>
              Плательщик НДС
            </Label>
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='defaultVatRateId'>Ставка НДС по умолчанию</Label>
            <Select
              value={form.watch('defaultVatRateId')}
              onValueChange={(value) => form.setValue('defaultVatRateId', value)}
            >
              <SelectTrigger id='defaultVatRateId'>
                <SelectValue placeholder='Выберите ставку' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='none'>Не выбрано</SelectItem>
                {vatRates.map((rate) => (
                  <SelectItem key={rate.id} value={rate.id.toString()}>
                    {rate.name} ({rate.rate}%)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center gap-2'>
            <Checkbox
              id='priceIncludesVat'
              checked={form.watch('priceIncludesVat')}
              onCheckedChange={(checked) => form.setValue('priceIncludesVat', checked === true)}
            />
            <Label htmlFor='priceIncludesVat' className='cursor-pointer'>
              Цены включают НДС
            </Label>
          </div>

          <Button type='submit' disabled={updateMutation.isPending}>
            {updateMutation.isPending ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
