"use client"

import { updateTodo } from "@/app/actions"
import { inLoadingAtom } from "@/utils/atoms"
import { Todo } from "@prisma/client"
import { useSetAtom } from "jotai"
import { FC, useEffect, useState } from "react"

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
}, 100)

const TodoItem: FC<{
  initialTodo: Todo
  onRemove?: (...args: any[]) => any
  editable?: boolean
}> = ({ initialTodo, onRemove, editable = true }) => {
  const [todo, setTodo] = useState<Todo>({ ...initialTodo })
  const setInLoading = useSetAtom(inLoadingAtom)

  useEffect(() => {
    debouncedUpdateTodo(todo)
  }, [todo])

  return (
    <div className="relative flex flex-row items-center gap-x-1">
      {onRemove && (
        <button
          className="absolute right-0 ml-2"
          type="button"
          onClick={async () => {
            setInLoading(true)
            await onRemove()
            setInLoading(false)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="h-4 w-4 stroke-neutral-400 transition duration-300 hover:stroke-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      )}
      <input
        type="checkbox"
        className="h-4 w-4 rounded"
        checked={todo.finished}
        disabled={!editable}
        onChange={(event) => {
          setTodo((previousTodo) => ({
            ...previousTodo,
            finished: event.target.checked,
          }))
        }}
      />
      <input
        type="text"
        className={`h-6 w-full border-0 focus:ring-0 ${
          todo.finished ? "line-through" : ""
        }`}
        placeholder="할 일 적기"
        value={todo.todo}
        disabled={!editable}
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
