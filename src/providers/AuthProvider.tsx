'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect } from 'react'

import { useUser } from '@/hooks/use-auth'

import type { User, UserRole } from '@/types/user'
import type { ReactNode } from 'react'

const PUBLIC_PATHS = ['/', '/register', '/reset-password']

interface AuthContextType {
  user: User | null
  isLoading: boolean
  role: UserRole | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, isError } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    const isPublic = PUBLIC_PATHS.includes(pathname) || pathname.startsWith('/invite')
    if (!isLoading && isError && !isPublic) {
      router.replace('/')
    }
  }, [isLoading, isError, pathname, router])

  const value: AuthContextType = {
    user: user ?? null,
    isLoading,
    role: user?.role ?? null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
