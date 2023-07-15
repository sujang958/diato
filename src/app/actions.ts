"use server"

import { dateToISODateFormat, getDateDuration } from "@/utils/date"
import { userAction } from "@/utils/middleware"
import { prisma } from "@/utils/prisma"
import { Todo, User } from "@prisma/client"
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
    const startOfWeek = new Date(date.getTime() - date.getUTCDay() * 86400000)
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 86400000)

    const foundTodos = await prisma.todo.findMany({
      where: {
        date: {
          gte: startOfWeek,
          lte: endOfWeek,
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

    revalidatePath("/[day]")

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

export const shareTodos = async (date: Date) =>
  await userAction(async (user) => {
    const startOfDate = new Date(dateToISODateFormat(date))
    const endOfDate = new Date(startOfDate.getTime())

    endOfDate.setHours(23, 59, 59, 999)

    const sharedTodo = await prisma.sharedTodo.findFirst({
      where: { authorId: user.id, date: { lte: endOfDate, gte: startOfDate } },
    })

    if (sharedTodo) return sharedTodo.id

    const newSharedTodo = await prisma.sharedTodo.create({
      data: {
        date: date,
        author: { connect: { id: user.id } },
      },
    })

    return newSharedTodo.id
  })

export const getSharedTodos = async (id: bigint) =>
  await userAction(async (user) => {
    const sharedTodo = await prisma.sharedTodo.findFirst({
      where: { authorId: user.id, id },
      include: { author: true },
    })

    if (!sharedTodo) return { ok: false, message: "Not found" }

    const startOfDate = new Date(dateToISODateFormat(sharedTodo.date))
    const endOfDate = new Date(startOfDate.getTime())

    endOfDate.setHours(23, 59, 59, 999)

    const sharedTodos = await prisma.todo.findMany({
      where: {
        authorId: sharedTodo.authorId,
        date: { gte: startOfDate, lte: endOfDate },
      },
    })

    return (
      {
        todos: sharedTodos,
        date: sharedTodo.date,
        author: sharedTodo.author,
      } ?? []
    )
  })

export const revokeSharedTodos = async (date: Date) =>
  await userAction(async (user) => {
    const { startOfDate, endOfDate } = getDateDuration(date)
    const sharedTodo = await prisma.sharedTodo.findFirst({
      where: {
        authorId: user.id,
        date: {
          gte: startOfDate,
          lte: endOfDate,
        },
      },
    })

    if (!sharedTodo) return { ok: false, message: "Not found" }

    await prisma.sharedTodo.delete({ where: { id: sharedTodo.id } })

    return { ok: true }
  })

export const getSharedTodosList = async () =>
  await userAction(
    async (user) =>
      await prisma.sharedTodo.findMany({
        where: { authorId: user.id },
      })
  )

export const getUser = async () => await userAction(async (user) => user)
