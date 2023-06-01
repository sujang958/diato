// import { userAction } from "@/utils/middleware"
// import { prisma } from "@/utils/prisma"
// import { cookies } from "next/headers"
// import { NextResponse } from "next/server"
// import SuperJSON from "superjson"
// import { z } from "zod"

// const updateTodoBodyParser = z.object({
//   id: z.bigint(),
//   todo: z.string().optional(),
//   finished: z.boolean().optional(),
// })

// export async function POST(request: Request) {
//   const body = updateTodoBodyParser.safeParse(
//     SuperJSON.parse(await request.text())
//   )

//   console.log("body", body)

//   if (!body.success) return new NextResponse(JSON.stringify({ ok: false }))

//   return await userAction(async (user) => {
//     const todo = body.data

//     const existingTodo = await prisma.todo.findUnique({
//       where: { id: todo.id },
//     })

//     if (existingTodo?.authorId !== user.id)
//       return new NextResponse(JSON.stringify({ ok: false }))

//     await prisma.todo.update({
//       data: {
//         ...(todo.todo && { todo: todo.todo }),
//         ...(todo.finished && { finished: todo.finished }),
//       },
//       where: {
//         id: todo.id,
//       },
//     })

//     return new NextResponse(JSON.stringify({ ok: true }))
//   })
// }
