"use client"

import DaySelectItem from "./DaySelectItem"
import { dateToISODateFormat } from "@/utils/date"
import ShareButton from "./ShareButton"
import { DayPicker, Row } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export type Days = "일" | "월" | "화" | "수" | "목" | "금" | "토"

const dayArray: Days[] = ["일", "월", "화", "수", "목", "금", "토"]

export default async function DayHeader({
  date,
  todosAmount,
}: {
  date: Date
  todosAmount: { [key: string]: number } // { '2023-01-11': 11 }
}) {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <button
          className="rounded-lg p-1 text-4xl font-bold"
          type="button"
          onClick={() => {
            setCalendarOpen((prev) => !prev)
          }}
        >
          {date.getMonth() + 1}월 {date.getDate()}일
        </button>
        <div className="item flex flex-row gap-x-6">
          <ShareButton date={date} />
          <Link href="/me" className="p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="h-5 w-5 stroke-neutral-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        </div>
        {calendarOpen && (
          <div
            className="fixed bottom-0 left-0 right-0 top-0 z-50 grid h-screen place-items-center bg-black/60 p-4 backdrop-blur"
            onClick={(event) => {
              if (!(event.target instanceof HTMLElement)) return
              if (event.target.closest("#rdp-root")) return

              setCalendarOpen(false)
            }}
          >
            <style>
              {`.rdp {
                  --rdp-accent-color: #000;
              }`}
            </style>
            <DayPicker
              id="rdp-root"
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                if (selectedDate)
                  router.push(
                    `/${dateToISODateFormat(
                      new Date(selectedDate.getTime() + 1000 * 60 * 60 * 24)
                    )}`
                  )
              }}
              footer={
                <div className="mt-2 flex w-full flex-row justify-end px-1">
                  <button
                    className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
                    onClick={() => {
                      setCalendarOpen(false)
                    }}
                  >
                    닫기
                  </button>
                </div>
              }
              className="rounded-lg bg-white p-4"
            />
          </div>
        )}
      </div>
      <div className="py-3"></div>
      <div className="flex flex-row items-center justify-between gap-x-2.5">
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
