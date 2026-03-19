'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { Input } from '@/components/ui/input'

const ServicesSearchBox = () => {
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <Input
      className='w-96'
      placeholder='Поиск по названию...'
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('search') ?? ''}
    />
  )
}

export default ServicesSearchBox
