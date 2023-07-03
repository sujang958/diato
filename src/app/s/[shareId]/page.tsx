import { getSharedTodos } from "@/app/actions"
import TodoDisplay from "@/components/TodoDisplay"
import { dateToISODateFormat } from "@/utils/date"
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
      {/* @ts-expect-error Async Server Component */}
      <TodoDisplay
        date={date}
        todos={todos}
        dayHeaderOption={{
          todosAmount: {},
          dateEditable: false,
          dayShown: false,
          sharable: false,
        }}
        addButtonShown={false}
        todoDeletable={false}
        between={
          <p className="text-sm text-neutral-600">
            {author.email}님의 리스트입니다
          </p>
        }
      />
      <div className="fixed bottom-16 left-0 flex w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-md flex-row items-center justify-end px-10">
          <Link href="/" className="rounded-full bg-black p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="h-5 w-5"
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
