import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "../server/router"
import { idToken, token } from "./atoms"
import { DiatoHeaders } from "./headers"

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
      headers: () => {
        const _idToken = idToken.get()
        const _token = token.get()

        return {
          ...(_idToken && { Authorization: _idToken }),
          ...(_token && { [DiatoHeaders.DiatoToken]: _token }),
        }
      },
    }),
  ],
})
