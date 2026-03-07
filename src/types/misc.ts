import type { BadgeVariant } from '@/features/inventory-documents/receipt/helpers/status-helper'
import type { LucideIcon } from 'lucide-react'

export interface TypeConfig {
  label: string
  variant: BadgeVariant
  description?: string
  icon?: LucideIcon
}

export type TypeMapping = Record<string, TypeConfig>
