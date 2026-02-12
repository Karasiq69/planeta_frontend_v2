import Pre from '@/components/ui/Pre'
import { getAllOrganizationsFn } from '@/features/organizations/api/actions'
import OrganizationsPageWrapper from '@/features/organizations/OrganizationsPageWrapper'

type Props = {}
const Page = async (props: Props) => {
  const orgs = await getAllOrganizationsFn()
  return (
    <div>
      <Pre object={orgs.data} />
      <OrganizationsPageWrapper />
    </div>
  )
}
export default Page
