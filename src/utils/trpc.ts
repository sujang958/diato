import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "../server/router"
import { idToken, token } from "./atoms"
import { DiatoHeaders } from "./headers"
import SuperJSON from "superjson"

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: SuperJSON,
  links: [
    httpBatchLink({
      url: import.meta.env.PROD ? `https://diato.vercel.app/api/trpc` : "http://localhost:3000/api/trpc",
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
