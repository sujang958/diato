import { prisma } from "@/utils/prisma"
import {
  getSharedTodosList,
  getUser,
  revokeSharedTodos,
} from "../actions"
import { redirect } from "next/navigation"
import { User } from "@prisma/client"
import Link from "next/link"
import { dateToISODateFormat } from "@/utils/date"
import { revalidatePath } from "next/cache"

export default async function MyAccountPage() {
  const [user, shared] = await Promise.all([getUser(), getSharedTodosList()])

  if ("ok" in user || "ok" in shared) return redirect("/login")

  async function updateUser(data: FormData) {
    "use server"
    const email = data.get("email")?.toString()
    const name = data.get("name")?.toString()

    if (!email && !name) return

    await prisma.user.update({
      where: { id: (user as User).id },
      data: {
        email,
        name,
      },
    })

    redirect("/")
  }

  async function removeSharedDate(date: Date) {
    "use server"

    await revokeSharedTodos(date)

    revalidatePath("/me")
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Link href="/" className="flex flex-row items-center gap-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 stroke-neutral-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <p className="text-medium text-neutral-700">계정 정보</p>
      </Link>
      <div className="pt-1"></div>
      <form className="flex flex-col gap-y-6" action={updateUser}>
        <label className="flex flex-col gap-y-1.5 text-sm">
          이름
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            className="rounded-lg border-neutral-300 px-2 py-1 text-[0.9rem]"
          />
        </label>
        <label className="flex flex-col gap-y-1.5 text-sm">
          이메일
          <input
            type="email"
            inputMode="email"
            name="email"
            defaultValue={user.email}
            className="rounded-lg border-neutral-300 px-2 py-1 text-[0.9rem]"
          />
        </label>
        <div className="fixed bottom-0 left-0 right-0 grid place-items-center bg-white/5 backdrop-blur-md">
          <div className="w-full max-w-md px-6 pb-12 pt-4">
            <button
              type="submit"
              className="w-full rounded-xl bg-black py-3 text-base font-semibold text-white"
            >
              저장하기
            </button>
          </div>
        </div>
      </form>
      <div className="py-4"></div>
      {shared.length > 0 && (
        <section>
          <p className="text-2xl font-bold">공유된 목록</p>
          <div className="py-2"></div>
          <div className="flex flex-col gap-y-3">
            {shared.map(({ date, createdAt }) => (
              <form className="flex flex-row items-center justify-between rounded-lg p-3 shadow">
                <div className="flex flex-col">
                  <p className="text-xl font-bold">
                    {date.getMonth() + 1}월 {date.getDate()}일
                  </p>
                  <p className="text-xs text-neutral-600">
                    {dateToISODateFormat(createdAt)} 에 공유됨
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button
                    type="submit"
                    formAction={removeSharedDate.bind(null, date)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4 stroke-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
