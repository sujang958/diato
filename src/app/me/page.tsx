import { prisma } from "@/utils/prisma"
import { getUser } from "../actions"
import { redirect } from "next/navigation"
import { User } from "@prisma/client"
import { revalidatePath } from "next/cache"
import Link from "next/link"

export default async function MyAccountPage() {
  const user = await getUser()

  if ("ok" in user) return redirect("/login")

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
    </div>
  )
}
