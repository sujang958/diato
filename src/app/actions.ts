"use server"

import { jwtPayload, verifyToken } from "@/utils/jwt"
import { prisma } from "@/utils/prisma"
import { ActionErrorResponse } from "@/utils/types"
import { Todo } from "@prisma/client"
import { cookies } from "next/headers"

// TODO: change this into a closure
const userAction = async <T>(
  action: (user: jwtPayload) => Promise<T | ActionErrorResponse>
): Promise<ActionErrorResponse | T> => {
  const user = await verifyToken(cookies().get("token")?.value ?? "")

  if (!("id" in user)) return { ok: false, message: "로그인이 안 되어있습니다" }

  return await action(user)
}

export const getTodos = async () =>
  await userAction(async (user) => {
    const todos = await prisma.todo.findMany({ where: { authorId: user.id } })

    return todos
  })

export const updateTodo = async (
  todoId: bigint,
  todo: Omit<Partial<Todo>, "id">
) =>
  await userAction(async (user) => {
    const todo = await prisma.todo.findUnique({ where: { id: todoId } })

    if (!todo) return { ok: false, message: "To-do not found" }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: { ...todo },
    })

    return updatedTodo
  })

export const addTodo = async (todoContent: string) =>
  await userAction(async (user) => {
    const todo = await prisma.todo.create({
      data: {
        date: new Date(),
        finished: false,
        todo: todoContent,
        author: { connect: { id: user.id } },
      },
    })

    return todo
  })
