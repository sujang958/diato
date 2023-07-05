"use client"

import { inLoadingAtom } from "@/utils/atoms"
import { useAtomValue } from "jotai"
import { FC } from "react"
import Loading from "./Loading"

const GlobalLoading: FC = () => {
  const inLoading = useAtomValue(inLoadingAtom)

  return inLoading ? <Loading /> : <div></div>
}

export default GlobalLoading
