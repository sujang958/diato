"use server"

import TodoAddButton from "@/components/TodoAddButton"
import DayHeader from "@/components/DayHeader"
import { addTodo, getTodos, getTodosAmount, removeTodo } from "../actions"
import TodoItem from "@/components/TodoItem"
import { redirect } from "next/navigation"
import { dateToISODateFormat } from "@/utils/date"

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
    <div className="flex flex-col">
      {/* @ts-expect-error Async Server Component */}
      <DayHeader
        date={date}
        todosAmount={"ok" in todosAmount ? {} : todosAmount}
      />
      <div className="py-5"></div>
      {
        <div className="flex flex-col gap-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={crypto.randomUUID()}
              initialTodo={todo}
              onRemove={removeTodo.bind(null, todo.id)}
            />
          ))}
        </div>
      }

      {/* TODO: add this <div className="grid grow place-items-center text-center gap-y-1">
          <p className="text-xl font-semibold">아직 아무 할 일도 없네요..</p>
          <p className="text-neutral-500 text-sm">+ 버튼을 눌러 추가해 보세요!</p>
        </div> */}

      <TodoAddButton onClick={addTodo.bind(null, date)} />
    </div>
  )
}
