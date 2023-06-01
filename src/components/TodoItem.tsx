"use client"

import { FC } from "react"

const TodoItem: FC = () => {
  return (
    <div className="flex flex-row items-center gap-x-1">
      <input type="checkbox" className="rounded w-4 h-4" />
      <input
        type="text"
        className="h-6 border-0 focus:ring-0"
        placeholder="할 일 적기"
      />
    </div>
  )
}

export default TodoItem
