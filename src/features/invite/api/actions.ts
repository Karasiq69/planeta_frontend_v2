import apiClient from '@/lib/auth/client'

export interface InviteInfo {
  employeeName: string
  organizationName: string
  email: string
}

export const validateInviteFn = async (token: string): Promise<InviteInfo> => {
  const res = await apiClient.get<InviteInfo>(`/invite/${token}`)
  return res.data
}

export const acceptInviteFn = async (
  token: string,
  data: { password: string },
): Promise<void> => {
  await apiClient.post(`/invite/${token}/accept`, data)
}
