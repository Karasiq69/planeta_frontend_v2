import { notFound } from 'next/navigation'

import DocumentPageContent from '@/features/documents/components/DocumentPageContent'
import { documentTypeConfigs } from '@/features/documents/lib/document-config'

import type { Metadata } from 'next'

type Props = {
  params: Promise<{ type: string; id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, id } = await params
  const config = documentTypeConfigs[type]
  return { title: `${config?.title ?? 'Документ'} #${id}` }
}

const Page = async ({ params }: Props) => {
  const { type, id } = await params

  if (!documentTypeConfigs[type]) return notFound()

  return <DocumentPageContent documentId={Number(id)} type={type} />
}

export default Page
