import { atom } from "nanostores"

export const idToken = atom<null | string>(null)

export const token = atom<null | string>(localStorage.getItem("token"))

export const focusedDate = atom<Date>(new Date())
