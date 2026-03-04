'use client'

import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  useDeleteTemplate,
  useGenerateByEntity,
  useGenerateDocument,
  usePreviewTemplate,
  useUploadTemplate,
} from '@/features/document-templates/api/mutations'
import { useTemplates } from '@/features/document-templates/api/queries'

import type { DocumentTemplate } from '@/features/document-templates/types'

function openBlobAsPdf(blob: Blob) {
  const pdfBlob = new Blob([blob], { type: 'application/pdf' })
  const url = URL.createObjectURL(pdfBlob)
  const win = window.open(url, '_blank')
  if (win) {
    win.onload = () => win.print()
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// ─────────────────────────────────────────────
// Шаг 1. Загрузка шаблона в систему
// ─────────────────────────────────────────────
function UploadSection() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('order')
  const [outputFormat, setOutputFormat] = useState('pdf')

  const upload = useUploadTemplate()

  const handleUpload = () => {
    const file = fileRef.current?.files?.[0]
    if (!file || !name || !slug) return

    upload.mutate(
      { file, name, slug, documentCategory: category, outputFormat },
      {
        onSuccess: () => {
          setName('')
          setSlug('')
          if (fileRef.current) fileRef.current.value = ''
        },
      }
    )
  }

  return (
    <div className='space-y-3 rounded border p-4'>
      <div>
        <h2 className='text-lg font-semibold'>1. Загрузка шаблона</h2>
        <p className='text-sm text-muted-foreground'>
          Загрузи .docx/.xlsx файл-шаблон с тегами Carbone (например{' '}
          <code className='rounded bg-muted px-1'>{'{d.clientName}'}</code>). Шаблон сохранится в
          Carbone и появится в таблице ниже.
        </p>
      </div>

      <div className='grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 text-sm'>
        <span className='font-medium'>Файл шаблона:</span>
        <Input ref={fileRef} type='file' accept='.docx,.xlsx,.odt,.ods' className='w-72' />

        <span className='font-medium'>Название:</span>
        <Input
          placeholder='например: Заказ-наряд'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-72'
        />

        <span className='font-medium'>Slug (код):</span>
        <Input
          placeholder='например: work-order'
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className='w-72'
        />

        <span className='font-medium'>Категория:</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='w-72 rounded border px-2 py-1.5'
        >
          <option value='order'>Заказ-наряд</option>
          <option value='invoice'>Накладная</option>
          <option value='act'>Акт</option>
          <option value='payment_invoice'>Счёт на оплату</option>
          <option value='report'>Отчёт</option>
        </select>

        <span className='font-medium'>Формат вывода:</span>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className='w-72 rounded border px-2 py-1.5'
        >
          <option value='pdf'>PDF</option>
          <option value='docx'>DOCX</option>
          <option value='xlsx'>XLSX</option>
        </select>
      </div>

      <Button onClick={handleUpload} disabled={upload.isPending}>
        {upload.isPending ? 'Загрузка...' : 'Загрузить шаблон'}
      </Button>
    </div>
  )
}

// ─────────────────────────────────────────────
// Шаг 2. Список загруженных шаблонов
// ─────────────────────────────────────────────
function TemplatesTable() {
  const { data: templates, isLoading } = useTemplates()
  const deleteMutation = useDeleteTemplate()
  const previewMutation = usePreviewTemplate()

  const handlePreview = (template: DocumentTemplate) => {
    previewMutation.mutate(template.id, {
      onSuccess: (blob) => openBlobAsPdf(blob),
    })
  }

  const handleDelete = (id: number) => {
    if (confirm('Удалить шаблон?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) return <div>Загрузка...</div>

  return (
    <div className='space-y-3 rounded border p-4'>
      <div>
        <h2 className='text-lg font-semibold'>
          2. Загруженные шаблоны ({templates?.length ?? 0})
        </h2>
        <p className='text-sm text-muted-foreground'>
          Все шаблоны, которые сейчас есть в системе.{' '}
          <strong>Превью</strong> — сгенерирует PDF с тестовыми данными и откроет в новой вкладке.{' '}
          <strong>Удалить</strong> — удалит шаблон из Carbone и БД.
        </p>
      </div>

      <table className='w-full border-collapse text-sm'>
        <thead>
          <tr className='border-b bg-muted/50 text-left'>
            <th className='p-2'>ID</th>
            <th className='p-2'>Название</th>
            <th className='p-2'>Slug</th>
            <th className='p-2'>Категория</th>
            <th className='p-2'>Файл</th>
            <th className='p-2'>Вывод</th>
            <th className='p-2'>Активен</th>
            <th className='p-2'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {templates?.map((t) => (
            <tr key={t.id} className='border-b'>
              <td className='p-2'>{t.id}</td>
              <td className='p-2'>{t.name}</td>
              <td className='p-2 font-mono text-xs'>{t.slug}</td>
              <td className='p-2'>{t.documentCategory}</td>
              <td className='p-2'>{t.fileExtension}</td>
              <td className='p-2'>{t.outputFormat}</td>
              <td className='p-2'>{t.isActive ? '✓' : '✗'}</td>
              <td className='space-x-1 p-2'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => handlePreview(t)}
                  disabled={previewMutation.isPending}
                >
                  {previewMutation.isPending ? '...' : 'Превью'}
                </Button>
                <Button
                  size='sm'
                  variant='destructive'
                  onClick={() => handleDelete(t.id)}
                  disabled={deleteMutation.isPending}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
          {templates?.length === 0 && (
            <tr>
              <td colSpan={8} className='p-4 text-center text-muted-foreground'>
                Шаблонов пока нет — загрузи первый шаблон выше
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// ─────────────────────────────────────────────
// Шаг 3. Генерация документа с произвольными данными
// ─────────────────────────────────────────────

const SAMPLE_JSON = JSON.stringify(
  {
    orderNumber: 'ЗН-000123',
    date: '2025-03-15',
    company: { name: 'ООО Автосервис', inn: '1234567890' },
    client: { fullName: 'Иванов Иван Иванович', phone: '+7 (999) 123-45-67' },
    vehicle: { brand: 'Toyota', model: 'Camry', plate: 'А123БВ777' },
    services: [{ index: 1, name: 'Замена масла', quantity: 1, price: 1500, total: 1500 }],
    parts: [{ index: 1, name: 'Масло 5W-30', quantity: 4, unit: 'л', price: 800, total: 3200 }],
    grandTotal: 4700,
  },
  null,
  2
)

function GenerateSection() {
  const { data: templates } = useTemplates()
  const [templateId, setTemplateId] = useState('')
  const [jsonData, setJsonData] = useState(SAMPLE_JSON)
  const [outputFormat, setOutputFormat] = useState('pdf')
  const generate = useGenerateDocument()

  const handleGenerate = () => {
    const id = Number(templateId)
    if (!id) return

    let data: Record<string, unknown>
    try {
      data = JSON.parse(jsonData)
    } catch {
      alert('Невалидный JSON')
      return
    }

    generate.mutate(
      { templateId: id, data, outputFormat },
      {
        onSuccess: (blob) => {
          if (outputFormat === 'pdf') {
            openBlobAsPdf(blob)
          } else {
            downloadBlob(blob, `document.${outputFormat}`)
          }
        },
      }
    )
  }

  return (
    <div className='space-y-3 rounded border p-4'>
      <div>
        <h2 className='text-lg font-semibold'>3. Генерация документа</h2>
        <p className='text-sm text-muted-foreground'>
          Выбери шаблон из списка, отредактируй JSON-данные и нажми «Сгенерировать». Теги в шаблоне
          (например <code className='rounded bg-muted px-1'>{'{d.client.fullName}'}</code>) будут
          заменены на значения из JSON. PDF откроется в новой вкладке с диалогом печати.
        </p>
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        <div className='text-sm'>
          <span className='font-medium'>Шаблон:</span>
          <select
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            className='ml-2 rounded border px-2 py-1.5'
          >
            <option value=''>-- выбери шаблон --</option>
            {templates?.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} (ID: {t.id}, {t.slug})
              </option>
            ))}
          </select>
        </div>

        <div className='text-sm'>
          <span className='font-medium'>Формат:</span>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            className='ml-2 rounded border px-2 py-1.5'
          >
            <option value='pdf'>PDF (откроется + печать)</option>
            <option value='docx'>DOCX (скачается)</option>
            <option value='xlsx'>XLSX (скачается)</option>
          </select>
        </div>

        <Button onClick={handleGenerate} disabled={generate.isPending || !templateId}>
          {generate.isPending ? 'Генерация...' : 'Сгенерировать'}
        </Button>
      </div>

      <div>
        <p className='mb-1 text-xs text-muted-foreground'>
          JSON-данные для подстановки (редактируй под свой шаблон):
        </p>
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          className='h-48 w-full rounded border p-2 font-mono text-xs'
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Шаг 4. Генерация по сущности (как в продакшене)
// ─────────────────────────────────────────────
function GenerateByEntitySection() {
  const { data: templates } = useTemplates()
  const [templateSlug, setTemplateSlug] = useState('')
  const [entityType, setEntityType] = useState('order')
  const [entityId, setEntityId] = useState('')
  const [outputFormat, setOutputFormat] = useState('pdf')
  const generate = useGenerateByEntity()

  const handleGenerate = () => {
    if (!templateSlug || !entityId) return

    generate.mutate(
      { templateSlug, entityType, entityId: Number(entityId), outputFormat },
      {
        onSuccess: (blob) => {
          if (outputFormat === 'pdf') {
            openBlobAsPdf(blob)
          } else {
            downloadBlob(blob, `${entityType}-${entityId}.${outputFormat}`)
          }
        },
      }
    )
  }

  const slugs = templates?.map((t) => t.slug).filter((v, i, a) => a.indexOf(v) === i) ?? []

  return (
    <div className='space-y-3 rounded border border-blue-200 bg-blue-50/30 p-4'>
      <div>
        <h2 className='text-lg font-semibold'>4. Генерация по сущности (продакшен-флоу)</h2>
        <p className='text-sm text-muted-foreground'>
          Именно так это будет работать в реальном приложении. Фронт отправляет только{' '}
          <strong>slug шаблона + тип сущности + ID</strong>. Бэкенд сам достаёт все данные из БД,
          собирает JSON и генерирует документ. Фронту не нужно знать структуру данных.
        </p>
      </div>

      <div className='grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 text-sm'>
        <span className='font-medium'>Slug шаблона:</span>
        <select
          value={templateSlug}
          onChange={(e) => setTemplateSlug(e.target.value)}
          className='w-72 rounded border px-2 py-1.5'
        >
          <option value=''>-- выбери шаблон --</option>
          {slugs.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <span className='font-medium'>Тип сущности:</span>
        <select
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
          className='w-72 rounded border px-2 py-1.5'
        >
          <option value='order'>order (Заказ-наряд)</option>
          <option value='invoice'>invoice (Накладная)</option>
          <option value='act'>act (Акт)</option>
          <option value='payment_invoice'>payment_invoice (Счёт на оплату)</option>
        </select>

        <span className='font-medium'>ID сущности:</span>
        <Input
          placeholder='например: 1, 42, 123...'
          value={entityId}
          onChange={(e) => setEntityId(e.target.value)}
          className='w-72'
        />

        <span className='font-medium'>Формат:</span>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className='w-72 rounded border px-2 py-1.5'
        >
          <option value='pdf'>PDF (откроется + печать)</option>
          <option value='docx'>DOCX (скачается)</option>
          <option value='xlsx'>XLSX (скачается)</option>
        </select>
      </div>

      <Button onClick={handleGenerate} disabled={generate.isPending || !templateSlug || !entityId}>
        {generate.isPending ? 'Генерация...' : 'Сгенерировать по сущности'}
      </Button>

      <div className='rounded bg-muted/50 p-3 text-xs text-muted-foreground'>
        <p className='font-medium'>Что происходит при нажатии:</p>
        <p>
          POST /templates/generate-by-entity {'{'} templateSlug: &quot;{templateSlug || '...'}&quot;,
          entityType: &quot;{entityType}&quot;, entityId: &quot;{entityId || '...'}&quot;, outputFormat:
          &quot;{outputFormat}&quot; {'}'}
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Главная страница
// ─────────────────────────────────────────────
export default function TemplatesTestPage() {
  return (
    <div className='space-y-6 p-6'>
      <div>
        <h1 className='text-2xl font-bold'>Тест: Шаблоны документов</h1>
        <p className='text-muted-foreground'>
          Тестовая страница для проверки загрузки шаблонов, генерации и печати документов через
          Carbone.
        </p>
      </div>
      <UploadSection />
      <TemplatesTable />
      <GenerateSection />
      <GenerateByEntitySection />
    </div>
  )
}
