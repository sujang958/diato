"use client"

import DaySelectItem from "./DaySelectItem"
import { dateToISODateFormat } from "@/utils/date"

export type Days = "일" | "월" | "화" | "수" | "목" | "금" | "토"

const dayArray: Days[] = ["일", "월", "화", "수", "목", "금", "토"]

export default async function DayHeader({
  date,
  todosAmount,
}: {
  date: Date
  todosAmount: { [key: string]: number }
}) {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <button className="text-4xl font-bold rounded-lg p-1" type="button">
          {date.getMonth() + 1}월 {date.getDate()}일
        </button>
        {/* <button type="button">
          <dialog
            open
            className="z-50 fixed top-1/2 -translate-y-1/2 bg-neutral-50 rounded-lg w-4/5 text-left flex flex-col gap-y-4 p-8"
          >
            <p className="font-bold text-2xl">공유하기</p>
            <p className="text-sm">
              링크가 있는 <span className="font-bold">모든 사용자들</span>이 볼
              수 있다는 점을 유의해 주세요.
            </p>
            <input
              type="text"
              className="text-sm bg-neutral-200 border-0 rounded-lg py-1 px-1.5"
              value="https://diato.asdfom/asdfasdfasdfasdf"
              disabled
            />
            <div className="py-0.5"></div>
            <div className="flex flex-row items-center justify-end">
              <button
                type="button"
                className="rounded-lg border border-blue-600 px-3 py-1.5 font-semibold text-sm"
              >
                복사하기
              </button>
              <button
                type="button"
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-white font-semibold text-sm"
              >
                확인
              </button>
            </div>
          </dialog>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="w-4 h-4 stroke-neutral-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
        </button> */}
      </div>
      <div className="py-3"></div>
      <div className="flex flex-row items-center gap-x-3 justify-between">
        {dayArray
          .map((dayName, i) => ({
            dayName,
            dateOfDay: new Date(
              date.getTime() + (i - date.getDay()) * 1000 * 60 * 60 * 24
            ),
          }))
          .map(({ dayName: name, dateOfDay }, i) => (
            /* @ts-expect-error Async Server Component */
            <DaySelectItem
              key={i}
              day={name}
              badges={todosAmount[dateToISODateFormat(dateOfDay)]}
              date={dateOfDay}
              className={`${
                i == date.getDay() ? "bg-neutral-900 text-white" : ""
              }`}
            />
          ))}
      </div>
    </>
  )
}
