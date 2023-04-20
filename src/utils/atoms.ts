import { atom } from "nanostores"

export const idToken = atom<null | string>(null)

export const token = atom<null | string>(localStorage?.getItem("token") ?? null)

export const focusedDate = atom<Date>(new Date())
