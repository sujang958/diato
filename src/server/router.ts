import { TRPCError, initTRPC } from "@trpc/server"
import type { Context } from "./context"
import { GithubAuthProvider, signInWithCredential } from "firebase/auth"
import { auth } from "../utils/firebase"
import prisma from "../utils/prisma"
import { sign } from "../utils/jwt"
import { z } from "zod"
import SuperJSON from "superjson"

const t = initTRPC.context<Context>().create({ transformer: SuperJSON })

const hasUser = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user)
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" })

  const user = await prisma.user.findUnique({
    where: {
      id: ctx.user.id,
    },
  })

  if (!user)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not found, try logging out",
    })

  return next({ ctx: { user: user } })
})

const userProcedure = t.procedure.use(hasUser)

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
  todos: userProcedure.query(async ({ ctx }) => {
    const user = ctx.user

    const todos = await prisma.todo.findMany({
      where: { authorId: user.id },
    })

    return todos
  }),
  addTodo: userProcedure
    .input(
      z.object({
        todo: z.string(),
        deadline: z.date().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user

      return await prisma.todo.create({
        data: {
          todo: input.todo,
          deadline: input.deadline,
          finished: false,
          startDate: new Date(),
          authorId: user.id,
        },
      })
    }),
  removeTodo: userProcedure
    .input(
      z.object({
        id: z.bigint(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user

      const todo = await prisma.todo.findUnique({
        where: { id: input.id },
      })

      if (!todo)
        throw new TRPCError({ code: "NOT_FOUND", message: "to-do not found" })

      if (todo.authorId != user.id)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permissions to do this",
        })

      await prisma.todo.delete({
        where: {
          id: input.id,
        },
      })
    }),
  updateTodo: userProcedure
    .input(
      z.object({
        id: z.bigint(),
        deadline: z.date().nullable(),
        todo: z.string().nullable(),
        finished: z.boolean().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user

      const todo = await prisma.todo.findUnique({
        where: { id: input.id },
      })

      if (!todo)
        throw new TRPCError({ code: "NOT_FOUND", message: "to-do not found" })

      if (todo.authorId != user.id)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permissions to do this",
        })

      const updatedTodo = await prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          ...(input.todo && { todo: input.todo }),
          ...(input.deadline && { deadline: input.deadline }),
          ...(input.finished && { finished: input.finished }),
        },
      })

      return updatedTodo
    }),
})

export type AppRouter = typeof appRouter
