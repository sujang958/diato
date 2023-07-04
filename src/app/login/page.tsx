"use server"

import { cookies } from "next/headers"
import { verifyToken } from "@/utils/jwt"
import { redirect } from "next/navigation"
import { dateToISODateFormat } from "@/utils/date"
import ClientLoginPage from "@/components/LoginPage"

export default async function LoginPage() {
  const token = cookies().get("token")
  if (!token?.value) return <ClientLoginPage />

  const result = await verifyToken(token.value)

  if ("ok" in result) {
    cookies().delete("token")
    return <ClientLoginPage />
  }

  return redirect(`/${dateToISODateFormat(new Date())}`)
}
