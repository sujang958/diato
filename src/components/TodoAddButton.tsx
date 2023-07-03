"use client"

import { FC, useState } from "react"
import Loading from "./Loading"

const TodoAddButton: FC<{ onClick: () => any }> = ({ onClick }) => {
  const [loadingShown, setLoadingShown] = useState(false)

  return (
    <>
      {loadingShown && <Loading className="z-50" />}
      <div className="fixed bottom-16 left-0 flex w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-md flex-row items-center justify-end px-10">
          <button
            type="button"
            className="rounded-full bg-black p-3"
            onClick={async () => {
              setLoadingShown(true)
              await onClick()
              setLoadingShown(false)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="h-5 w-5"
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
    </>
  )
}

export default TodoAddButton
