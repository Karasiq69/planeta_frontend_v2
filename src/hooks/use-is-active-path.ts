'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useMemo } from 'react'

/**
 * Среди sibling-путей активным считается только самый специфичный (длинный) совпавший.
 */
export function useIsActivePath(items: { url: string; items?: { url: string }[] }[]) {
  const pathname = usePathname()

  const allUrls = useMemo(
    () => items.flatMap((item) => item.items?.map((sub) => sub.url) ?? [item.url]),
    [items]
  )

  return useCallback(
    (url: string) => {
      const matches = allUrls.filter(
        (u) => pathname === u || pathname.startsWith(u + '/')
      )
      if (matches.length === 0) return false
      const bestMatch = matches.reduce((a, b) => (a.length >= b.length ? a : b))
      return url === bestMatch
    },
    [pathname, allUrls]
  )
}
