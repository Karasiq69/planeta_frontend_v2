import { notFound } from 'next/navigation'

import DocumentPageContent from '@/features/documents/components/DocumentPageContent'
import { documentTypeConfigs } from '@/features/documents/lib/document-config'

type Props = {
  params: Promise<{ type: string; id: string }>
}

const Page = async ({ params }: Props) => {
  const { type, id } = await params

  if (!documentTypeConfigs[type]) return notFound()

  return <DocumentPageContent documentId={Number(id)} type={type} />
}

export default Page
