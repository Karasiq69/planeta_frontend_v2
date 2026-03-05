import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Нет доступа' }

type Props = {}
const Page = (props: Props) => {
  return <div>Page no access</div>
}
export default Page
