import { cookies } from "next/headers"
import { jwtPayload, verifyToken } from "./jwt"
import { ActionErrorResponse } from "./types"
import { redirect } from "next/navigation"
import { prisma } from "./prisma"
import { User } from "@prisma/client"

// TODO: change this into a closure
export const userAction = async <T>(
  action: (user: User) => Promise<T | ActionErrorResponse>
): Promise<ActionErrorResponse | T> => {
  const user = await verifyToken(cookies().get("token")?.value ?? "")

  if (!("id" in user)) return redirect("/login")

  const prismaUser = await prisma.user.findUnique({ where: { id: user.id } })

  if (!prismaUser) return redirect("/login")

  return await action(prismaUser)
}
