import { useMemo } from 'react'

import { useOrganization } from '@/features/organizations/api/queries'
import { useVatRates } from '@/features/vat-rates/api/queries'
import {
  getVatLabel,
  getVatResult,
  type VatConfig,
  type VatResult,
} from '@/features/vat-rates/lib/vat-calculator'
import { useOrganizationStore } from '@/stores/organization-store'

const DEFAULT_VAT_RESULT: VatResult = {
  vatAmount: 0,
  label: 'НДС',
  formattedAmount: 'Без НДС',
}

export const useVat = (organizationId?: number) => {
  const { organization: storeOrg } = useOrganizationStore()
  const { data: fetchedOrg, isLoading: isOrgLoading } = useOrganization(organizationId ?? 0)

  const { data: vatRates, isLoading: isRatesLoading } = useVatRates({ active: true })

  const organization = organizationId ? fetchedOrg : storeOrg
  const isLoading = organizationId ? isOrgLoading || isRatesLoading : isRatesLoading

  const config: VatConfig | null = useMemo(() => {
    if (!organization) return null

    const vatRate = vatRates?.find((r) => r.id === organization.defaultVatRateId)
    const rate = vatRate ? parseFloat(vatRate.rate) : 0

    return {
      isVatPayer: organization.isVatPayer,
      priceIncludesVat: organization.priceIncludesVat,
      rate,
    }
  }, [organization, vatRates])

  const calculateVat = (subtotal: number): VatResult => {
    if (!config) return DEFAULT_VAT_RESULT
    return getVatResult(subtotal, config)
  }

  const getLabel = (): string => {
    if (!config) return 'Без НДС'
    return getVatLabel(config)
  }

  return { config, isLoading, calculateVat, getLabel }
}
