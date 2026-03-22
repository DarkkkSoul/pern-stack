import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllProducts } from '../lib/api'

export function useProducts() {
    const result = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    return result;
}

export const useCreateProduct = () => {
    return useMutation({ mutationFn: createProduct })
}