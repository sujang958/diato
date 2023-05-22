"use server"

import { sign, verify } from "jsonwebtoken"
import { z } from "zod"
import { ActionErrorResponse } from "./types"
import superjson from "superjson"

const RSA_PUBLIC = process.env.RSA_PUBLIC
const RSA_PRIVATE = process.env.RSA_PRIVATE

const jwtPayload = z.object({
  id: z.bigint(),
  email: z.string(),
})

export type jwtPayload = z.infer<typeof jwtPayload>

export const verifyToken = async (
  token: string
): Promise<jwtPayload | ActionErrorResponse> => {
  if (!RSA_PUBLIC) return { ok: false, message: "server fault" }

  try {
    const jwtResult = superjson.parse(verify(token, RSA_PUBLIC).toString())
    const parseResult = jwtPayload.safeParse(jwtResult)
    if (!parseResult.success) throw ReferenceError("Invalid token")

    return parseResult.data
  } catch (e) {
    return { ok: false, message: "cannot verify the token" }
  }
}

export const signToken = async (id: bigint, email: string) => {
  if (!RSA_PRIVATE) return { ok: false, message: "server fault" }

  const token = sign(
    superjson.stringify({ id, email } satisfies jwtPayload),
    RSA_PRIVATE,
    {
      algorithm: "RS256",
    }
  )

  return token
}
