'use client'

import { use } from 'react'

import OrganizationDetailPage from '@/features/organizations/components/OrganizationDetailPage'

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)
  return <OrganizationDetailPage id={Number(id)} />
}

export default Page
