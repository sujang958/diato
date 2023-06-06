"use client"

import { FC } from "react"

const TodoAddButton: FC<{ onClick: () => any }> = ({ onClick }) => {
  return (
    <div className="fixed flex flex-col items-center justify-center bottom-16 w-full left-0">
      <div className="max-w-md w-full px-10 flex flex-row items-center justify-end">
        <button
          type="button"
          className="bg-black rounded-full p-3"
          onClick={() => {
            onClick()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TodoAddButton
