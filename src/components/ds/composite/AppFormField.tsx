'use client'

import * as React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'

import { AppInput } from '../base/AppInput'
import { AppTextarea } from '../base/AppTextarea'
import { AppCheckbox } from '../base/AppCheckbox'
import { AppDatePicker } from '../base/AppDatePicker'
import { AppSelect, type SelectOption } from '../base/AppSelect'
import { Input } from '@/components/ui/input'

type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'date' | 'checkbox'

interface AppFormFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  type?: FieldType
  description?: string
  placeholder?: string
  options?: SelectOption[]
  disabled?: boolean
  className?: string
}

function AppFormField<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  description,
  placeholder,
  options,
  disabled,
  className,
}: AppFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {type !== 'checkbox' && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {renderInput({ type, field, placeholder, options, disabled, label })}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function renderInput({
  type,
  field,
  placeholder,
  options,
  disabled,
  label,
}: {
  type: FieldType
  field: Record<string, unknown>
  placeholder?: string
  options?: SelectOption[]
  disabled?: boolean
  label: string
}) {
  switch (type) {
    case 'textarea':
      return (
        <AppTextarea
          placeholder={placeholder}
          disabled={disabled}
          value={field.value as string}
          onChange={field.onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          onBlur={field.onBlur as React.FocusEventHandler<HTMLTextAreaElement>}
        />
      )
    case 'select':
      return (
        <AppSelect
          options={options ?? []}
          value={field.value as string}
          onChange={field.onChange as (value: string) => void}
          placeholder={placeholder}
          disabled={disabled}
        />
      )
    case 'date':
      return (
        <AppDatePicker
          value={field.value as Date | undefined}
          onChange={field.onChange as (date: Date | undefined) => void}
          placeholder={placeholder}
        />
      )
    case 'checkbox':
      return (
        <AppCheckbox
          label={label}
          checked={field.value as boolean}
          onCheckedChange={field.onChange as (checked: boolean) => void}
          disabled={disabled}
        />
      )
    case 'number':
      return (
        <Input
          type="number"
          placeholder={placeholder}
          disabled={disabled}
          value={field.value as number}
          onChange={field.onChange as React.ChangeEventHandler<HTMLInputElement>}
          onBlur={field.onBlur as React.FocusEventHandler<HTMLInputElement>}
        />
      )
    case 'text':
    default:
      return (
        <AppInput
          placeholder={placeholder}
          disabled={disabled}
          value={field.value as string}
          onChange={field.onChange as React.ChangeEventHandler<HTMLInputElement>}
          onBlur={field.onBlur as React.FocusEventHandler<HTMLInputElement>}
        />
      )
  }
}

export { AppFormField, type AppFormFieldProps, type FieldType }
