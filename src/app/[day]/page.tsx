"use server"

import TodoAddButton from "@/components/TodoAddButton"
import DayHeader from "@/components/DayHeader"
import { addTodo, getTodos, removeTodo } from "./actions"
import TodoItem from "@/components/TodoItem"
import { redirect } from "next/navigation"

export default async function Home({ params }: { params: { day: string } }) {
  const date = new Date(Number(params.day))
  const todos = await getTodos(date)

  if (!Array.isArray(todos)) return redirect("/login")

  return (
    <div className="flex flex-col">
      {/* @ts-expect-error Async Server Component */}
      <DayHeader date={date} />
      <div className="py-5"></div>
      <div className="flex flex-col gap-y-3">
        {todos.map((todo, i) => (
          <TodoItem
            key={i}
            initialTodo={todo}
            onRemove={removeTodo.bind(null, todo.id)}
          />
        ))}
      </div>
      <TodoAddButton onClick={addTodo.bind(null, date)} />
    </div>
  )
}
