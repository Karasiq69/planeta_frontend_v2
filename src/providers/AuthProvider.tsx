'use client'

import { QueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useState } from 'react'


import { useUser } from '@/hooks/use-auth'
import { authApi } from '@/lib/auth/auth'

import type { User } from '@/types/user'
import type { AxiosResponse } from 'axios'
import type { ReactNode} from 'react';

// import {getQueryClient} from "@/providers/QueryProvider";

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: any
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<AxiosResponse<any, any>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading: isUserLoading, error: userError } = useUser()
  const router = useRouter()
  // const queryClient = getQueryClient()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const queryClient = new QueryClient()
  const login = async (email: string, password: string) => {
    setIsLoggingIn(true)
    try {
      await authApi.login(email, password)
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      // router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoggingIn(false)
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
      queryClient.clear()
      // router.push('/');
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  const value: AuthContextType = {
    user: user || null,
    isLoading: isUserLoading || isLoggingIn,
    error: userError,
    login,
    logout,
    refresh: authApi.refreshToken,
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
