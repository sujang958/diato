"use client"

import { inLoadingAtom } from "@/utils/atoms"
import { useSetAtom } from "jotai"
import { FC } from "react"

const TodoAddButton: FC<{ onClick: (...args: any[]) => any }> = ({
  onClick,
}) => {
  const setInLoading = useSetAtom(inLoadingAtom)

  return (
    <>
      <div className="fixed bottom-16 left-0 flex w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-md flex-row items-center justify-end px-10">
          <button
            type="button"
            className="rounded-full bg-black p-3.5"
            onClick={async () => {
              setInLoading(true)
              await onClick()
              setInLoading(false)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="h-6 w-6"
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
