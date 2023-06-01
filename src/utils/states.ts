import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// export const tokenAtom = atomWithStorage<string | null>("token", null)

export const dateAtom = atom<Date>(new Date())
