import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "../server/router"
import { idToken } from "./atoms"

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
      headers: () => {
        return {
          Authorization: idToken.get() ?? undefined,
        }
      },
    }),
  ],
})
