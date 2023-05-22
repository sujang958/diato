import { atom } from "nanostores"

export const idToken = atom<null | string>(null)

export const token = atom<null | string>(null)

export const focusedDate = atom<Date>(new Date())
