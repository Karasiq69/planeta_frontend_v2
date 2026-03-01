'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { organizationFormSchema, type OrganizationCreation } from '@/features/organizations/api/dto'
import { useCreateOrganization, useUpdateOrganization } from '@/features/organizations/api/mutations'

import type { Organization } from '@/features/organizations/types'

interface OrganizationFormProps {
  organization?: Organization
  onSuccess?: () => void
}

const OrganizationForm = ({ organization, onSuccess }: OrganizationFormProps) => {
  const isEditing = !!organization
  const createMutation = useCreateOrganization()
  const updateMutation = useUpdateOrganization()
  const isPending = createMutation.isPending || updateMutation.isPending

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationCreation>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: organization
      ? {
          name: organization.name,
          inn: organization.inn,
          kpp: organization.kpp ?? '',
          ogrn: organization.ogrn ?? '',
          legalAddress: organization.legalAddress ?? '',
          actualAddress: organization.actualAddress ?? '',
          phone: organization.phone ?? '',
          email: organization.email ?? '',
          bankName: organization.bankName ?? '',
          bankBik: organization.bankBik ?? '',
          bankAccount: organization.bankAccount ?? '',
        }
      : { name: '', inn: '' },
  })

  const onSubmit = (data: OrganizationCreation) => {
    if (isEditing) {
      updateMutation.mutate({ id: organization.id, data }, { onSuccess })
    } else {
      createMutation.mutate(data, { onSuccess })
    }
  }

  const fields = [
    { name: 'name' as const, label: 'Название', required: true },
    { name: 'inn' as const, label: 'ИНН', required: true },
    { name: 'kpp' as const, label: 'КПП' },
    { name: 'ogrn' as const, label: 'ОГРН' },
    { name: 'legalAddress' as const, label: 'Юридический адрес' },
    { name: 'actualAddress' as const, label: 'Фактический адрес' },
    { name: 'phone' as const, label: 'Телефон' },
    { name: 'email' as const, label: 'Email' },
    { name: 'bankName' as const, label: 'Банк' },
    { name: 'bankBik' as const, label: 'БИК' },
    { name: 'bankAccount' as const, label: 'Расчётный счёт' },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='grid gap-4 sm:grid-cols-2'>
        {fields.map((field) => (
          <div key={field.name} className='space-y-1.5'>
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className='text-destructive'> *</span>}
            </Label>
            <Input id={field.name} {...register(field.name)} />
            {errors[field.name] && (
              <p className='text-sm text-destructive'>{errors[field.name]?.message}</p>
            )}
          </div>
        ))}
      </div>

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
      </Button>
    </form>
  )
}

export default OrganizationForm
