"use client"

import Lottie from "lottie-react"

export default function Loading() {
  return (
    <div className="h-full w-full grid place-items-center">
      <Lottie
        animationData={require("../../../public/lotties/loading.json")}
        loop={true}
        className="w-8 h-8"
      />
    </div>
  )
}
