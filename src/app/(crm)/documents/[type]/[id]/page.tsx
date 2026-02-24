import React from 'react'

import PageHeader from '@/components/common/PageHeader'
import { getDocumentById } from '@/features/documents/api/actions'

type Props = {
  params: Promise<{ type: string; id: string }>
}

const Page = async ({ params }: Props) => {
  const { id } = await params
  const document = await getDocumentById(Number(id))

  return (
    <section>
      <div className='space-y-5'>
        <PageHeader title={`Документ #${document.id}`} showBackButton />
        <pre className='text-xs bg-muted p-4 rounded-lg overflow-auto'>
          {JSON.stringify(document, null, 2)}
        </pre>
      </div>
    </section>
  )
}

export default Page
