import { getSharedTodos } from "@/app/actions"
import TodoItem from "@/components/TodoItem"
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
  )
}
