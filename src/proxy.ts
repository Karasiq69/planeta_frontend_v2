import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

const publicPaths = ['/', '/register', '/reset-password']

function parseJwtPayload(token: string): { exp?: number } | null {
  try {
    const base64Payload = token.split('.')[1]
    if (!base64Payload) return null
    const json = Buffer.from(base64Payload, 'base64').toString('utf-8')
    return JSON.parse(json)
  } catch {
    return null
  }
}

function isTokenValid(request: NextRequest): boolean {
  const accessCookie = request.cookies.get('access')
  if (!accessCookie?.value) return false

  const payload = parseJwtPayload(accessCookie.value)
  if (!payload?.exp) return false

  return payload.exp * 1000 > Date.now()
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = publicPaths.includes(pathname)
  const isAuthenticated = isTokenValid(request)

  // Авторизованный пользователь на публичной странице → dashboard
  if (isAuthenticated && isPublic) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Неавторизованный пользователь на защищённой странице → логин
  if (!isAuthenticated && !isPublic) {
    const url = new URL('/', request.url)
    url.searchParams.set('returnUrl', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|static|.*\\..*|_vercel).*)'],
}
