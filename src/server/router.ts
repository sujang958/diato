import { initTRPC } from "@trpc/server"
import type { Context } from "./context"
import { GithubAuthProvider, signInWithCredential } from "firebase/auth"
import { auth } from "../utils/firebase"
import prisma from "../utils/prisma"
import { bigintToString, sign } from "../utils/jwt"

const t = initTRPC.context<Context>().create()

export const appRouter = t.router({
  signIn: t.procedure.query(async ({ ctx }) => {
    const idToken = ctx.req.headers.get("Authorization")

    if (!idToken) return { ok: false, message: "there was no id token" }

    const result = await signInWithCredential(
      auth,
      GithubAuthProvider.credential(idToken)
    )

    const email = result.user.email

    if (!email) return { ok: false, message: "Email required!" }

    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: result.user.displayName ?? "unnamed",
        },
      })
    }

    return { token: sign(user) }
  }),
  todos: t.procedure.query(async ({ ctx }) => {
    if (!ctx.user) return { ok: false, message: "You're not signed in" }

    const user = await prisma.user.findUnique({
      where: {
        id: ctx.user.id,
      },
    })

    if (!user) return { ok: false, message: "User not found, try logging out" }

    const todos = await prisma.todo.findMany({
      where: { authorId: user.id },
    })

    return todos
  }),
})

export type AppRouter = typeof appRouter
