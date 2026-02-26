import PageHeader from '@/components/common/PageHeader'
import OrganizationSection from '@/features/settings/components/OrganizationSection'

const Page = () => {
  return (
    <div className='space-y-6'>
      <PageHeader title='Настройки' />

      <div className='flex gap-8'>
        <nav className='w-48 shrink-0'>
          <div className='rounded-md bg-muted px-3 py-2 text-sm font-medium'>
            Организация
          </div>
        </nav>

        <div className='flex-1'>
          <OrganizationSection />
        </div>
      </div>
    </div>
  )
}

export default Page
