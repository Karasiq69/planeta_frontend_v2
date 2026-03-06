'use client'

import { useLogout } from '@/hooks/use-auth'

export default function LogoutPage() {
  const { mutate: logout } = useLogout()

  return (
    <div>
      logout page
      <button onClick={() => logout()}>logout</button>
    </div>
  )
}
