import { dateToISODateFormat } from "@/utils/date"
import { verifyToken } from "@/utils/jwt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function IndexPage() {
  const token = await verifyToken(cookies().get("token")?.value ?? "")

  if ("id" in token) return redirect(`/${dateToISODateFormat(new Date())}`)
  else return redirect(`/login`)
}
