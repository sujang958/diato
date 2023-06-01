"use server"

import TodoAddButton from "@/components/TodoAddButton"
import DayHeader from "@/components/DayHeader"
import { addTodo, getTodos, removeTodo } from "./actions"
import TodoItem from "@/components/TodoItem"

export default async function Home() {
  const todos = await getTodos()

  return (
    <div className="flex flex-col">
      <DayHeader />
      <div className="py-5"></div>
      <div className="flex flex-col gap-y-3">
        {Array.isArray(todos)
          ? todos.map((todo, i) => (
              <TodoItem
                key={i}
                initialTodo={todo}
                onRemove={removeTodo.bind(null, todo.id)}
              />
            ))
          : ""}
      </div>
      <TodoAddButton onClick={addTodo} />
    </div>
  )
}
