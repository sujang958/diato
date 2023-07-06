import { getSharedTodos } from "@/app/actions"
import TodoItem from "@/components/TodoItem"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function SharedTodoPage({
  params,
}: {
  params: { shareId: string }
}) {
  const intShareId = parseInt(params.shareId)

  if (isNaN(intShareId)) return redirect("/")

  const shareId = BigInt(params.shareId)
  const sharedTodos = await getSharedTodos(shareId)

  if ("ok" in sharedTodos) return redirect("/")

  const { todos, date, author } = sharedTodos

  return (
    <>
      <div className="flex flex-col">
        <p className="text-center text-3xl font-bold">
          {date.getMonth() + 1}월 {date.getDate()}일{" "}
          {["일", "월", "화", "수", "목", "금", "토"][date.getDay()]}요일
        </p>
        <div className="py-5">
          <p className="text-center text-base text-neutral-600">
            {author.name}님의 공유된 리스트입니다
          </p>
        </div>
        <div className="flex flex-col gap-y-3 py-2">
          {todos.map((todo) => (
            <TodoItem
              key={crypto.randomUUID()}
              initialTodo={todo}
              editable={false}
            />
          ))}
        </div>
      </div>
      <div className="fixed bottom-16 left-0 flex w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-md flex-row items-center justify-end px-10">
          <Link href="/" className="rounded-full bg-black p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  )
}
