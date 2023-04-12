import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import type { APIRoute } from "astro"
import { appRouter } from "../../../server/router"
import { createContext } from "../../../server/context"

export const all: APIRoute = ({ request }) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext,
  })
}

// export const getStaticPaths = () => {
//   return Object.keys(appRouter._def.procedures).map((key) => ({
//     params: { trpc: key },
//   }))
// }
