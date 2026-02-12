'use client'
import { useAuth } from '@/providers/AuthProvider'

type Props = {}
const Page = (props: Props) => {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }
  return (
    <div>
      logout page
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}
export default Page
