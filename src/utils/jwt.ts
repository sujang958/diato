import { config } from "dotenv"
import jwt from "jsonwebtoken"
import { z } from "zod"

config()

const JWT_PUB = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA4ReWPjBWv80PEf77+nq4
PoQkWYI4lEUFjckQmjZlv4fALi5ik7SRO8ty9HS8ekdZ/1Nd9pCQbAxpccD8Cxj8
q9XSehlO664Au0ywuy5RxV0ibgkG4fu56ofQQMUFFZvg/2Gz/ZuRRo024YEq04/V
u+9zCzi5THzrfMIZ4xCvvU8RSimJXrEaZzY510Bs6AoIE1T46t8kdstJbp4UppB4
FjKn4qd61p5dI9SQJUP7RXjeiyeJBjbzNJ4JKYQ6OtpVdDGDX2Ec+n7oPbbhUKTX
pc9h2oVYjm/M8J/TGMKdrTkVMHjHxEkD3Xr47aLzHz1XZ3/682TBfTop12jUYKD3
HchmQ/hPP24gCaKTRwXM1Ymyrqd0fnO+3ROITMgqWYv8DrtD7Y9qibpX5O84MvUq
tdROapRnNSOqa0lRnjppBQYV24Uq1DanAyTzMFE8F3Awjg+DUiULy3mnVIH2PxLW
4ERBMlcMZRgAptXshuhW8BhCcxxRzjG2SQwxZZ3eYQbmOr+aqiSVuSM7vxccVEAo
ozbzl3AUGQCyuShZl3p0aUFAVxzLekqtTO/Jah5tjgv41HDkOnmOKuDNL9nHNL1j
Q2xCYbOYJThDHsvWoH38fnwkCU1KsFq4Zh1JDQT4LAu1j8LIgjM795bgooepP2a2
WzatZpR7tDHiyD/0fbfXG/ECAwEAAQ==
-----END PUBLIC KEY-----
`
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

export const verify = (token: string) => {
  const payload = jwt.verify(token, JWT_PUB)

  const parsed = JWTPayload.safeParse(payload)
  if (!parsed.success) throw new Error("Payload not valid")

  return parsed.data
}
