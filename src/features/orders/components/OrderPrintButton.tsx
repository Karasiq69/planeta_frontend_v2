import { Loader2, Printer } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useGenerateByEntity } from '@/features/document-templates/api/mutations'
import { useTemplates } from '@/features/document-templates/api/queries'
import { getDocumentCategoryLabel } from '@/features/document-templates/constants'
import type { DocumentTemplate } from '@/features/document-templates/types'
import { openBlobAsPdf } from '@/lib/open-blob-as-pdf'

type Props = {
  orderId: number
}

export default function OrderPrintButton({ orderId }: Props) {
  const { data: templates, isLoading } = useTemplates()
  const generateMutation = useGenerateByEntity()

  const grouped = React.useMemo(() => {
    if (!templates) return new Map<string, DocumentTemplate[]>()
    const map = new Map<string, DocumentTemplate[]>()
    for (const t of templates.filter((t) => t.isActive)) {
      const list = map.get(t.documentCategory) ?? []
      list.push(t)
      map.set(t.documentCategory, list)
    }
    return map
  }, [templates])

  const handlePrint = (template: DocumentTemplate) => {
    generateMutation.mutate(
      {
        templateSlug: template.slug,
        entityType: 'order',
        entityId: orderId,
        outputFormat: 'pdf',
      },
      {
        onSuccess: (blob) => openBlobAsPdf(blob),
      }
    )
  }

  const entries = Array.from(grouped.entries())

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={generateMutation.isPending}>
          {generateMutation.isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Printer size={16} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isLoading && (
          <DropdownMenuItem disabled>
            <Loader2 size={14} className="animate-spin mr-2" />
            Загрузка...
          </DropdownMenuItem>
        )}
        {!isLoading && entries.length === 0 && (
          <DropdownMenuItem disabled>Нет доступных шаблонов</DropdownMenuItem>
        )}
        {entries.map(([category, categoryTemplates], idx) => (
          <DropdownMenuGroup key={category}>
            {idx > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel>{getDocumentCategoryLabel(category)}</DropdownMenuLabel>
            {categoryTemplates.map((template) => (
              <DropdownMenuItem key={template.id} onClick={() => handlePrint(template)}>
                {template.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
