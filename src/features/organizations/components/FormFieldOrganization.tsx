import { Building2 } from 'lucide-react'
import React, { useMemo } from 'react'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAllOrganizations } from '@/features/organizations/api/queries'
import { cn } from '@/lib/utils'

import type { UseFormReturn } from 'react-hook-form'



interface OrganizationSelectFieldProps {
  form: UseFormReturn<any>
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

const FormFieldOrganization: React.FC<OrganizationSelectFieldProps> = ({
  form,
  label = 'Организация:',
  placeholder = 'Выбрать организацию',
  className,
  disabled = false,
}) => {
  const { data: orgs, isLoading } = useAllOrganizations()

  const currentOrgId = form.watch('organizationId')

  const selectOptions = useMemo(() => {
    if (!orgs?.data) return []
    const active = orgs.data.filter((org) => org.isActive)
    // Если текущая организация неактивна — добавляем её в список
    if (currentOrgId) {
      const currentOrg = orgs.data.find((org) => org.id === currentOrgId)
      if (currentOrg && !currentOrg.isActive) {
        return [...active, currentOrg]
      }
    }
    return active
  }, [orgs?.data, currentOrgId])

  const getOrgLabel = (org: { id: number; name: string; isActive: boolean }) =>
    org.isActive ? org.name : `${org.name} (отключена)`

  return (
    <div className={cn('flex flex-col lg:flex-row gap-3 items-center', className)}>
      <Label className='lg:w-36 text-muted-foreground'>{label}</Label>
      <div className='w-full'>
        <FormField
          control={form.control}
          name='organizationId'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <Select
                value={field.value?.toString() || ''}
                onValueChange={(value) => {
                  form.setValue('organizationId', Number(value), {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }}
                disabled={disabled || isLoading}
              >
                <FormControl>
                  <SelectTrigger
                    className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80"
                  >
                    <SelectValue placeholder={placeholder}>
                      <Building2 size={16} aria-hidden='true' />
                      {selectOptions.find((org) => org.id === currentOrgId)
                        ? getOrgLabel(selectOptions.find((org) => org.id === currentOrgId)!)
                        : placeholder}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent
                  className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
                >
                  {selectOptions.map((org) => (
                    <SelectItem key={org.id} value={org.id.toString()}>
                      <Building2 size={16} aria-hidden='true' />
                      {getOrgLabel(org)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default FormFieldOrganization
