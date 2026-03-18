import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProducts } from '../lib/api'

function useProducts() {
    const result = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    return result;
}

export default useProducts