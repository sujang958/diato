"use client"

import Lottie from "lottie-react"
import { twMerge } from "tailwind-merge"

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        "fixed bottom-0 left-0 right-0 top-0 grid place-items-center bg-black/20 backdrop-blur-md",
        className
      )}
    >
      <Lottie
        animationData={require("../../public/lotties/loading.json")}
        loop={true}
        className="h-8 w-8"
      />
    </div>
  )
}
