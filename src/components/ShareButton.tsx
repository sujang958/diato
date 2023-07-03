"use client"

import { FC, useId, useState } from "react"

const ShareButton: FC = () => {
  const [alertShown, setAlertShown] = useState(false)

  return (
    <>
      <button type="button" className="p-1" onClick={() => setAlertShown(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="h-4 w-4 stroke-neutral-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
          />
        </svg>
      </button>
      <div
        onClick={(event) => {
          if (!(event.target instanceof HTMLElement)) return
          if (event.target.closest(`#share-alert-root`)) return

          setAlertShown(false)
        }}
        className={`fixed bottom-0 left-0 right-0 top-0 z-50 ${
          alertShown ? "grid" : "hidden"
        } h-screen place-items-center bg-black/60 p-12 backdrop-blur transition duration-1000`}
      >
        <div
          id="share-alert-root"
          className="flex w-full max-w-xs flex-col gap-y-2 rounded-lg border border-neutral-500 bg-white px-6 py-4"
        >
          <p className="text-xl font-bold">공유하기</p>
          <p className="text-xs text-neutral-500">
            링크가 있는 모든 사용자들이 할 일 목록을 볼 수 있게 됩니다.
          </p>
          <div className="py-0.5"></div>
          <div className="flex flex-row items-center justify-end gap-x-2">
            <button
              className="rounded-lg border border-neutral-400 px-3 py-1.5 text-xs font-semibold"
              onClick={() => {
                // TODO: add a login that cancels sharing to-dos
                setAlertShown(false)
              }}
            >
              공유 취소
            </button>
            <button
              className="rounded-lg bg-black px-3 py-1.5 text-xs font-semibold text-white"
              onClick={() => {
                // TODO: add a login that shares to-dos
                navigator.clipboard.writeText("sex")
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShareButton
