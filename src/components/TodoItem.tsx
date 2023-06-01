"use client"

import { updateTodo } from "@/app/actions"
import { Todo } from "@prisma/client"
import { FC, useCallback, useEffect, useState } from "react"
import SuperJSON from "superjson"

function debounce(func: (...args: any[]) => any, delay: number) {
  let timerId: NodeJS.Timeout

  return (...args: Parameters<typeof func>) => {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      func.call(undefined, ...args)
    }, delay)
  }
}

const debouncedUpdateTodo = debounce((todo: Todo) => {
  updateTodo(todo).then((v) => console.log("Updated", v))
}, 1000)

const TodoItem: FC<{ initialTodo: Todo }> = ({ initialTodo }) => {
  const [todo, setTodo] = useState<Todo>(initialTodo)

  useEffect(() => {
    debouncedUpdateTodo(todo)
  }, [todo])

  return (
    <div className="flex flex-row items-center gap-x-1">
      <input
        type="checkbox"
        className="rounded w-4 h-4"
        checked={todo.finished}
        onChange={(event) => {
          setTodo((previousTodo) => ({
            ...previousTodo,
            finished: event.target.checked,
          }))
        }}
      />
      <input
        type="text"
        className="h-6 border-0 focus:ring-0"
        placeholder="할 일 적기"
        value={todo.todo}
        onInput={(event) => {
          const target = event.target
          if (target instanceof HTMLInputElement)
            setTodo((previousTodo) => ({
              ...previousTodo,
              todo: target.value,
            }))
        }}
      />
    </div>
  )
}

export default TodoItem
