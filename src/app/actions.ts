"use server"

import { verifyToken } from "@/utils/jwt"
import { prisma } from "@/utils/prisma"
import { ActionErrorResponse } from "@/utils/types"
import { Todo } from "@prisma/client"

export const getTodos = async (
  token: string
): Promise<ActionErrorResponse | Todo[]> => {
  const user = await verifyToken(token)

  if (!("id" in user)) return { ok: false, message: "로그인이 안 되어있습니다" }

  const todos = await prisma.todo.findMany({ where: { authorId: user.id } })

  return todos
}
