"use server"

import TodoAddButton from "@/components/TodoAddButton"
import DayHeader from "@/components/DayHeader"
import { addTodo, getTodos, getTodosAmount, removeTodo } from "../app/actions"
import TodoItem from "@/components/TodoItem"
import { Todo } from "@prisma/client"

export default async function TodoDisplay({
  date,
  todos,
  addButtonShown = true,
  dayHeaderOption,
  todoDeletable = true,
  between,
  todoEditable = true,
}: {
  date: Date
  todos: Todo[]
  addButtonShown?: boolean
  dayHeaderOption: Omit<Parameters<typeof DayHeader>[0], "date">
  todoDeletable?: boolean
  todoEditable?: boolean
  between?: any
}) {
  return (
    <div className="flex flex-col">
      {/* @ts-expect-error Async Server Component */}
      <DayHeader date={date} {...dayHeaderOption} />
      {between ?? ""}
      <div className="py-5"></div>
      <div className="flex flex-col gap-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={crypto.randomUUID()}
            initialTodo={todo}
            editable={todoEditable}
            onRemove={
              todoDeletable ? removeTodo.bind(null, todo.id) : undefined
            }
          />
        ))}
      </div>
      {addButtonShown && <TodoAddButton onClick={addTodo.bind(null, date)} />}
    </div>
  )
}
