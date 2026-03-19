import { notFound } from 'next/navigation'

import UIKitShowcase from './ui-kit-showcase'

export default function UIKitPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  return <UIKitShowcase />
}
