'use client'
import Pre from '@/components/ui/Pre'
import { useReceiptDocumentItems } from '@/features/inventory-documents/receipt/api/queries'
import { useAllStorageLocations } from '@/features/warehouse/api/queries'

type Props = {}
const Page = (props: Props) => {
  // const {data, isLoading} = useUser()
  const { data: storageLocations = [], isLoading } = useReceiptDocumentItems(131)

  if (isLoading) return 'ev load'
  return (
    <div className="text-xs ">
      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
      {/*<pre>{JSON.stringify(events, null, 2)}</pre>*/}
      <Pre object={storageLocations} />
      sex
    </div>
  )
}
export default Page
