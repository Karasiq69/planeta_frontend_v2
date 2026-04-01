import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Organization } from '@/features/organizations/types/organizations'

const ORG_COOKIE_NAME = 'organization-id'
const ORG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 год

function setOrgCookie(orgId: number) {
  document.cookie = `${ORG_COOKIE_NAME}=${orgId}; path=/; max-age=${ORG_COOKIE_MAX_AGE}`
}

function deleteOrgCookie() {
  document.cookie = `${ORG_COOKIE_NAME}=; path=/; max-age=0`
}

export function getOrgIdFromCookie(): number | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${ORG_COOKIE_NAME}=([^;]*)`))
  return match ? Number(match[1]) : null
}

interface OrganizationStore {
  organization: Organization | null
  _hasHydrated: boolean
  setOrganization: (org: Organization) => void
  clearOrganization: () => void
}

export const useOrganizationStore = create<OrganizationStore>()(
  persist(
    (set) => ({
      organization: null,
      _hasHydrated: false,
      setOrganization: (org) => {
        setOrgCookie(org.id)
        set({ organization: org })
      },
      clearOrganization: () => {
        deleteOrgCookie()
        set({ organization: null })
      },
    }),
    {
      name: 'organization',
      onRehydrateStorage: () => (state) => {
        // Синхронизируем cookie после гидрации из localStorage
        if (state?.organization) {
          setOrgCookie(state.organization.id)
        }
        useOrganizationStore.setState({ _hasHydrated: true })
      },
      partialize: (state) => ({ organization: state.organization }),
    },
  ),
)
