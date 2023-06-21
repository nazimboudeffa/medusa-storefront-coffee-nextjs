import Medusa from "@medusajs/medusa-js"
import { QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60 * 24,
        retry: 1,
      },
    },
  })

const medusa = new Medusa({ baseUrl: process.env.BACKEND_URL })

export { medusa, queryClient }