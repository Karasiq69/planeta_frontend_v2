'use client'

import { Eye, Pencil, Trash2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  useDeleteTemplate,
  usePreviewTemplate,
  useReplaceTemplateFile,
  useUpdateTemplate,
  useUploadTemplate,
} from '@/features/document-templates/api/mutations'
import { useTemplates } from '@/features/document-templates/api/queries'
import {
  DOCUMENT_CATEGORY_LABELS,
  getDocumentCategoryLabel,
} from '@/features/document-templates/constants'
import { openBlobAsPdf } from '@/lib/open-blob-as-pdf'
import { cn } from '@/lib/utils'

import type { DocumentTemplate } from '@/features/document-templates/types'

const OUTPUT_FORMAT_OPTIONS = [
  { value: 'pdf', label: 'PDF' },
  { value: 'docx', label: 'DOCX' },
  { value: 'xlsx', label: 'XLSX' },
]

const ACCEPT = '.docx,.xlsx,.html,.odt,.ods'

function EditForm({
  template,
  onClose,
}: {
  template: DocumentTemplate
  onClose: () => void
}) {
  const [name, setName] = useState(template.name)
  const [category, setCategory] = useState(template.documentCategory)
  const [outputFormat, setOutputFormat] = useState(template.outputFormat)
  const replaceFileRef = useRef<HTMLInputElement>(null)

  const updateMutation = useUpdateTemplate(template.id)
  const replaceMutation = useReplaceTemplateFile(template.id)

  const handleSave = () => {
    updateMutation.mutate(
      { name, documentCategory: category, outputFormat },
      { onSuccess: onClose }
    )
  }

  const handleReplaceFile = () => {
    const file = replaceFileRef.current?.files?.[0]
    if (!file) return
    replaceMutation.mutate(file, { onSuccess: onClose })
  }

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label>Название</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className='space-y-2'>
        <Label>Категория</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DOCUMENT_CATEGORY_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <Label>Формат вывода</Label>
        <Select value={outputFormat} onValueChange={setOutputFormat}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {OUTPUT_FORMAT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2 rounded-lg border p-3'>
        <Label>Заменить файл шаблона</Label>
        <div className='flex gap-2'>
          <Input ref={replaceFileRef} type='file' accept={ACCEPT} className='flex-1' />
          <Button
            variant='outline'
            size='sm'
            onClick={handleReplaceFile}
            disabled={replaceMutation.isPending}
          >
            {replaceMutation.isPending ? 'Замена...' : 'Заменить'}
          </Button>
        </div>
      </div>

      <Button onClick={handleSave} disabled={updateMutation.isPending} className='w-full'>
        {updateMutation.isPending ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </div>
  )
}

const TemplatesPage = () => {
  const { data: templates, isLoading } = useTemplates()
  const deleteMutation = useDeleteTemplate()
  const previewMutation = usePreviewTemplate()
  const uploadMutation = useUploadTemplate()

  const [editTemplate, setEditTemplate] = useState<DocumentTemplate | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<DocumentTemplate | null>(null)

  const [dragOver, setDragOver] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('order')
  const [outputFormat, setOutputFormat] = useState('pdf')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetUploadForm = () => {
    setUploadFile(null)
    setName('')
    setSlug('')
    setCategory('order')
    setOutputFormat('pdf')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFileSelect = (file: File) => {
    setUploadFile(file)
    if (!name) {
      const baseName = file.name.replace(/\.[^.]+$/, '')
      setName(baseName)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleUpload = () => {
    if (!uploadFile || !name || !slug) return
    uploadMutation.mutate(
      { file: uploadFile, name, slug, documentCategory: category, outputFormat },
      { onSuccess: resetUploadForm }
    )
  }

  const handlePreview = (template: DocumentTemplate) => {
    previewMutation.mutate(template.id, {
      onSuccess: (blob) => openBlobAsPdf(blob),
    })
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    })
  }

  const items = templates ?? []

  return (
    <div className='space-y-6'>
      <PageHeader title='Шаблоны документов' showBackButton />

      {/* Upload zone */}
      <div
        className={cn(
          'relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors',
          dragOver
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50'
        )}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !uploadFile && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type='file'
          accept={ACCEPT}
          className='hidden'
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileSelect(file)
          }}
        />

        {!uploadFile ? (
          <div className='flex flex-col items-center gap-3'>
            <div className='flex size-16 items-center justify-center rounded-full bg-muted'>
              <Upload className='size-7 text-muted-foreground' />
            </div>
            <div>
              <p className='text-lg font-medium'>Перетащите файл шаблона сюда</p>
              <p className='text-sm text-muted-foreground'>
                или нажмите для выбора &middot; .docx, .xlsx, .html
              </p>
            </div>
          </div>
        ) : (
          <div className='space-y-4' onClick={(e) => e.stopPropagation()}>
            <p className='text-sm font-medium'>
              Файл: <span className='text-primary'>{uploadFile.name}</span>
            </p>

            <div className='mx-auto grid max-w-md gap-3'>
              <div className='space-y-1'>
                <Label>Название</Label>
                <Input
                  placeholder='например: Заказ-наряд'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='space-y-1'>
                <Label>Код (slug)</Label>
                <Input
                  placeholder='например: work-order'
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>

              <div className='space-y-1'>
                <Label>Категория</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(DOCUMENT_CATEGORY_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-1'>
                <Label>Формат вывода</Label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OUTPUT_FORMAT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='flex justify-center gap-2'>
              <Button variant='outline' size='sm' onClick={resetUploadForm}>
                Отмена
              </Button>
              <Button
                size='sm'
                onClick={handleUpload}
                disabled={uploadMutation.isPending || !name || !slug}
              >
                {uploadMutation.isPending ? 'Загрузка...' : 'Загрузить шаблон'}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <LoaderSectionAnimated className='rounded p-10' />
      ) : items.length > 0 ? (
        <div className='rounded-lg border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Формат вывода</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='w-28' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className='font-medium'>{t.name}</TableCell>
                  <TableCell>{getDocumentCategoryLabel(t.documentCategory)}</TableCell>
                  <TableCell className='text-muted-foreground'>
                    {t.outputFormat.toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={t.isActive ? 'success' : 'secondary'}>
                      {t.isActive ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-1'>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='size-8'
                        onClick={() => handlePreview(t)}
                        disabled={previewMutation.isPending}
                      >
                        <Eye className='size-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='size-8'
                        onClick={() => setEditTemplate(t)}
                      >
                        <Pencil className='size-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='size-8 text-destructive hover:text-destructive'
                        onClick={() => setDeleteTarget(t)}
                      >
                        <Trash2 className='size-4' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className='rounded-lg border p-8 text-center text-muted-foreground'>
          Шаблонов пока нет — загрузите первый шаблон выше
        </div>
      )}

      {/* Edit dialog */}
      <Dialog open={!!editTemplate} onOpenChange={(open) => !open && setEditTemplate(null)}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Редактирование шаблона</DialogTitle>
          </DialogHeader>
          {editTemplate && (
            <EditForm template={editTemplate} onClose={() => setEditTemplate(null)} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить шаблон?</AlertDialogTitle>
            <AlertDialogDescription>
              Шаблон «{deleteTarget?.name}» будет удалён. Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default TemplatesPage
