import { useQuery } from '@tanstack/react-query'

import { getProductBrandsFn } from '@/features/product-brands/api/actions'
import { productBrandQueryKeys } from '@/features/product-brands/api/query-keys'

export const useProductBrands = () => {
  return useQuery({
    queryKey: productBrandQueryKeys.list(),
    queryFn: getProductBrandsFn,
    staleTime: 1000 * 60 * 5,
  })
}
