"use server"

import TodoAddButton from "@/components/TodoAddButton"
import DayHeader from "@/components/DayHeader"
import { addTodo, getTodos, getTodosAmount, removeTodo } from "../actions"
import TodoItem from "@/components/TodoItem"
import { redirect } from "next/navigation"
import { dateToISODateFormat } from "@/utils/date"
import TodoDisplay from "@/components/TodoDisplay"

export default async function Home({ params }: { params: { day: string } }) {
  const date = new Date(params.day)

  if (isNaN(date.getTime()))
    return redirect(`/${dateToISODateFormat(new Date())}`)

  const [todos, todosAmount] = await Promise.all([
    getTodos(date),
    getTodosAmount(date),
  ])

  if (!Array.isArray(todos)) return redirect("/login")

  return (
    /* @ts-expect-error Async Server Component */
    <TodoDisplay
      date={date}
      todos={todos}
      dayHeaderOption={{ todosAmount: "ok" in todosAmount ? {} : todosAmount }}
    />
  )
}
