import { useQuery } from '@tanstack/react-query'

import { getAllMechanicsFn } from '@/features/mechanics/api/actions'
import { mechanicsQueryKeys } from '@/features/mechanics/api/query-keys'

export const useAllMechanics = () => {
  return useQuery({
    queryKey: mechanicsQueryKeys.all,
    queryFn: () => getAllMechanicsFn(),
  })
}
