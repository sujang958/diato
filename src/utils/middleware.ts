import { cookies } from "next/headers"
import { jwtPayload, verifyToken } from "./jwt"
import { ActionErrorResponse } from "./types"
import { redirect } from "next/navigation"

// TODO: change this into a closure
export const userAction = async <T>(
  action: (user: jwtPayload) => Promise<T | ActionErrorResponse>
): Promise<ActionErrorResponse | T> => {
  const user = await verifyToken(cookies().get("token")?.value ?? "")

  if (!("id" in user)) return redirect("/login")

  return await action(user)
}
