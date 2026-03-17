import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Organization } from '@/features/organizations/types/organizations'

interface OrganizationStore {
  organization: Organization | null
  setOrganization: (org: Organization) => void
  clearOrganization: () => void
}

export const useOrganizationStore = create<OrganizationStore>()(
  persist(
    (set) => ({
      organization: null,
      setOrganization: (org) => set({ organization: org }),
      clearOrganization: () => set({ organization: null }),
    }),
    { name: 'organization' },
  ),
)
