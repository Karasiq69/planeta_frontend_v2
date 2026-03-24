import AcceptInvitePage from '@/features/invite/components/AcceptInvitePage'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Активация аккаунта' }

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  return <AcceptInvitePage token={token} />
}
