"use client"

import { tokenAtom } from "@/utils/states"
import { useAtom } from "jotai"
import { NextPage } from "next"
import  { useRouter } from "next/router"
import { useEffect } from "react"

const SettingsPgae: NextPage = () => {


  return (
    <div className="flex flex-col">
      <header className="fixed top-12">
        <button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </header>
      <div className="py-8"></div>
    </div>
  )
}

export default SettingsPgae
