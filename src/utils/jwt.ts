import { config } from "dotenv"
import jwt from "jsonwebtoken"
import { z } from "zod"

config()

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new ReferenceError("JWT SECRET NOT FOUND")
}

export const JWTPayload = z.object({
  id: z.bigint().or(z.string()),
  email: z.string(),
})

export type JWTPayloadType = z.infer<typeof JWTPayload>

export type JWTPayloadTypeBigint = {
  id: bigint
} & JWTPayloadType

export type JWTPayloadTypeString = {
  id: string
} & JWTPayloadType

export const bigintToString = (
  payload: JWTPayloadType
): JWTPayloadTypeString => {
  return { ...payload, id: payload.id.toString() }
}

export const stringToBigint = (
  payload: JWTPayloadType
): JWTPayloadTypeBigint => {
  return { ...payload, id: BigInt(payload.id.toString()) }
}

export const sign = (payload: JWTPayloadType) => {
  if (!JWT_SECRET) {
    throw new ReferenceError("JWT SECRET NOT FOUND")
  }

  return jwt.sign(bigintToString(payload), JWT_SECRET, { algorithm: "RS256" })
}

export const decode = (token: string, toBigint: boolean) => {
  const payload = JSON.parse(jwt.decode(token)?.toString() ?? "{}")

  const parsed = JWTPayload.safeParse(payload)
  if (!parsed.success) throw new Error("Payload not valid")

  if (toBigint) return stringToBigint(parsed.data)
  else return bigintToString(parsed.data)
}
