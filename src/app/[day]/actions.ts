"use server"

import { dateToISODateFormat } from "@/utils/date"
import { userAction } from "@/utils/middleware"
import { prisma } from "@/utils/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const getTodos = async (date: Date) =>
  await userAction(async (user) => {
    const todos = await prisma.todo.findMany({ where: { authorId: user.id } })

    return todos.filter(
      (todo) => dateToISODateFormat(todo.date) == dateToISODateFormat(date)
    )
  })

export const getTodosAmount = async (date: Date) =>
  await userAction(async (user) => {
    const startOfWeek = new Date(Date.now() - date.getDay() * 86400000)

    const foundTodos = await prisma.todo.findMany({
      where: {
        date: {
          gte: startOfWeek,
          lte: new Date(startOfWeek.getTime() + 7 * 86400000),
        },
        authorId: user.id,
      },
    })

    const sortedTodos: { [key: string]: number } = {}

    foundTodos.forEach((todo) => {
      const date = dateToISODateFormat(todo.date)
      sortedTodos[date] ??= 0
      sortedTodos[date] += 1
    })

    return sortedTodos
  })

export const updateTodo = async (todo: Todo) =>
  await userAction(async (user) => {
    const _todo = await prisma.todo.findUnique({ where: { id: todo.id } })

    if (!_todo) return { ok: false, message: "To-do not found" }
    if (_todo.authorId !== user.id)
      return { ok: false, message: "It's not your to-do" }

    const updatedTodo = await prisma.todo.update({
      where: { id: todo.id },
      data: { ...todo },
    })

    return updatedTodo
  })

export const addTodo = async (date: Date) =>
  await userAction(async (user) => {
    const todo = await prisma.todo.create({
      data: {
        date: new Date(dateToISODateFormat(date)),
        finished: false,
        todo: "",
        author: { connect: { id: user.id } },
      },
    })

    revalidatePath("/")

    return todo
  })

export const removeTodo = async (todoId: bigint) =>
  await userAction(async (user) => {
    const _todo = await prisma.todo.findUnique({ where: { id: todoId } })

    if (!_todo) return { ok: false, message: "To-do not found" }
    if (_todo.authorId !== user.id)
      return { ok: false, message: "It's not your to-do" }

    await prisma.todo.delete({ where: { id: todoId } })

    revalidatePath(`/[day]`)

    return { ok: true }
  })
