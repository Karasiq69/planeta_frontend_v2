'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'

const GoBackButton = () => {
  const router = useRouter()
  return (
    <Button size="sm" variant="outline" onClick={() => router.back()}>
      <ChevronLeft />
    </Button>
  )
}
export default GoBackButton
