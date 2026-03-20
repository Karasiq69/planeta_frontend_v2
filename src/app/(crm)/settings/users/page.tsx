import UsersPage from '@/features/users/components/UsersPage'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Пользователи' }

const Page = () => {
  return <UsersPage />
}

export default Page
