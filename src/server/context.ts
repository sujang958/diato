import type { inferAsyncReturnType } from "@trpc/server"
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"
import { JWTPayloadTypeBigint, stringToBigint, verify } from "../utils/jwt"
import { DiatoHeaders } from "../utils/headers"

export async function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const context: {
    req: Request
    resHeaders: Headers
    user: JWTPayloadTypeBigint | null
  } = {
    req,
    resHeaders,
    user: null,
  }

  const jwt = req.headers.get(DiatoHeaders.DiatoToken)

  console.log(jwt)
  if (jwt) {
    try {
      const payload = verify(jwt)

      context.user = stringToBigint(payload)
    } catch (e) {
      console.log("There was an error while verifying jwt")
      console.log(e)
    }
  }

  return context
}

export type Context = inferAsyncReturnType<typeof createContext>
