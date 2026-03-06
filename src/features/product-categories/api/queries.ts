import { useQuery } from '@tanstack/react-query'

import { getAllCategoriesFn } from '@/features/product-categories/api/actions'
import { categoryQueryKeys } from '@/features/product-categories/api/query-keys'

export const useProductCategories = () => {
  return useQuery({
    queryKey: categoryQueryKeys.list(),
    queryFn: getAllCategoriesFn,
    staleTime: 1000 * 60 * 5,
  })
}
