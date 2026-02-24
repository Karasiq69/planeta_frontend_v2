import type { BadgeVariant } from '@/features/inventory-documents/receipt/helpers/status-helper'

export interface TypeConfig {
  label: string
  variant: BadgeVariant
  description?: string
}

export type TypeMapping = Record<string, TypeConfig>
